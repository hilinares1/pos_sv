odoo.define('pos_sv.pos_sv', function (require) {
"use strict";

var screens = require('point_of_sale.screens');
var models = require('point_of_sale.models');
var gui = require('point_of_sale.gui');
var rpc = require('web.rpc');

models.load_fields('pos.config', 'invoice_journal_ids');

models.load_models({
    model: 'account.journal',
    fields: ['id','name'],
    domain: function(self){ return [['company_id','=',self.company && self.company.id]]},
    loaded: function(self,journals){
        self.journals = journals;
    },
});

var _super_order = models.Order.prototype;    
models.Order = models.Order.extend({
    set_diario_id: function(id) {
        this.set({
            diario_id: id,
        });
    },
    get_diario_id: function() {
        return this.get('diario_id');
    },
    export_as_JSON: function() {
        var json = _super_order.export_as_JSON.apply(this,arguments);
        var diario_id = this.get('diario_id');
        if (diario_id) {
            json['invoice_journal_id'] = diario_id;
        }
        else {
            json['invoice_journal_id'] = this.pos.config.invoice_journal_id[0];
        }
        return json
    },
});

var JournalButton = screens.ActionButtonWidget.extend({
    template: 'JournalButton',

    button_click: function(){
        this.select_journal();
    },
    select_journal: function(){
        var list = [];
        for (var i = 0; i < this.pos.journals.length; i++) {
            if (this.pos.config.invoice_journal_ids.includes(this.pos.journals[i].id)) {
                list.push({
                    'label': this.pos.journals[i].name,
                    'item':  this.pos.journals[i],
                });                        
            }
        }
        var orden = this.pos.get_order();
        this.pos.gui.show_popup('selection', {
            'title': 'Diario',
            'list': list,
            'confirm': function(line) {
                orden.set_diario_id(line.id);
            },
        });
    },
});

screens.define_action_button({
    'name': 'journal_button',
    'widget': JournalButton,
});

});

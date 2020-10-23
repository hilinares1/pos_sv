# -*- coding: utf-8 -*-
{
    'name': "Point of Sale para El Salvador",

    'summary': """Cambios al Punto de Venta para el manejo en El Salvador""",

    'description': """Cambios al Punto de Venta para el manejo en El Salvador""",

    'author': "aquíH",
    'website': "http://www.aquih.com",

    'category': 'Point of Sale',
    'version': '0.1',

    'depends': ['point_of_sale'],

    'data': [
        'views/pos_config_view.xml',
        'views/templates.xml',
    ],
    'qweb': [
        'static/src/xml/pos_sv.xml',
    ],
}

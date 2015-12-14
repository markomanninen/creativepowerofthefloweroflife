# Keywords

This list of keywords and phrases can be used to search more information about the FOL from libraries and search engines:

Flower of Life, six-petal rosette, six-spoked wheel, rosette, Apsamikku / Apsamikkum, concave square, square root of 3, square root of 2, intersecting circles, hexagon, hexagram, equilateral triangle, rhombus, Vesica Piscis, Fleur-de-lis, tree of life, menorah, sacred geometry, ancient mathematics, cuneiform,...

{% if book.allwords.length %}
All words in the document: {{ book.allwords.length }}
{% endif %}

{% if book.uniquewords.length %}
Unique words in the document: {{ book.uniquewords.length }}

<hr/>

{{ book.uniquewords.sort().join(', ') }}
{% endif %}

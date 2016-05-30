<!-- pagewrapper -->
# Keywords


This list of keywords and phrases can be used to search more information about the FOL from libraries and search engines:

flower of life, six-petal rosette, six-spoked wheel, rosette, apsamikku, concave square, square root of 3, square root of 2, intersecting circles, overlapping circles, hexagon, hexagram, equilateral triangle, rhombus, vesica piscis, fleur-de-lis, lily, tree of life, menorah, sacred geometry, ancient mathematics, hittite sun

{% if book.allwords.length %}
All words in the document: {{ book.allwords.length }}
{% endif %}

{% if book.uniquewords.length %}
Unique words in the document: {{ book.uniquewords.length }}

<hr/>

{{ book.uniquewords.sort().join(', ') }}
{% endif %}

<!-- endpagewrapper -->

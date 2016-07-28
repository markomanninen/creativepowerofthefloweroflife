# Keywords

The following list of keywords and phrases can be used to search more information about the Flower of Life related topics from libraries and search engines:

*{{ config.keywords }}*

{% if book.allwords.length %}
All words in the document: {{ book.allwords.length }}
{% endif %}

{% if book.uniquewords.length %}
Unique words in the document: {{ book.uniquewords.length }}

<hr/>

{{ book.uniquewords.sort().join(', ') }}
{% endif %}

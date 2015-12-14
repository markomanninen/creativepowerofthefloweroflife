{% if book.citations %}
<ul class="citations">
{% for cite in book.citations %}
{% if cite.match(file.path) %}<li>{{ cite.replace(file.path, '../'+file.path) }}</li>{% endif %}
{% endfor %}
</ul>
{% endif %}

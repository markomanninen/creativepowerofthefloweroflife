{% if book.citationss %}
<ul class="citations">
{% for cite in book.citations %}{% if cite.match(file.path) %}<li>{{ cite.replace('.md', '.html') }}</li>{% endif %}{% endfor %}
</ul>
{% endif %}

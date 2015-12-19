# Credits

Special thanks to Minna Haataja for proofreading and editing help.


### Pictures

I have published all my own photos and illustrations with the Creative Commons license<!-- cite author="wikipedia.org" title="Creative Commons license" date="" location="" type="website" href="http://en.wikipedia.org/wiki/Creative_Commons_license" -->. I believe it is the way to keep creative work and research hassle free and enjoyable for everyone. Pictures and figures below without a copyright notice are my own work, i.e. free to use with a mention "&copy; Marko Manninen".

<ul class="pictures">
{% for picture in book.pictures %}<li>{{ picture }}</li>{% endfor %}
</ul>

{% include 'footnotes.md' %}

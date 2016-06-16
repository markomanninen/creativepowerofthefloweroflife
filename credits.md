# Credits

I want to express my special thanks and deep gratitude to Minna Haataja for her invaluable time spent with proofreading and editing the book. Countless sentences are now much clearer and easier to understand than they would have been, if they were written solely by my own hands.

### Pictures

I have published all my own photos and illustrations with the Creative Commons license<!-- cite author="wikipedia.org" title="Creative Commons license" date="" location="" type="website" href="http://en.wikipedia.org/wiki/Creative_Commons_license" -->. I believe that is the best way to keep creative work and research hassle free and to be able to be enjoyed by everyone. The pictures and the figures below that have no copyright notice are my own and they are free to be used with a mention *&copy; Marko Manninen* accompanied by a reference to the original work.

<ul class="pictures">
{% for picture in book.pictures %}<li>{{ picture }}</li>{% endfor %}
</ul>

{% include 'footnotes.md' %}

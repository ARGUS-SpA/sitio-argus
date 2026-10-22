"""Check static-site links and commercial invariants; Python standard library only."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import argparse
import json
import urllib.request
import xml.etree.ElementTree as ET

class Document(HTMLParser):
    def __init__(self,text):
        super().__init__(); self.links=[]; self.ids=set(); self.h1=0; self.in_json=False; self.json=''; self.feed(text)
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if a.get('id'): self.ids.add(a['id'])
        if tag=='h1': self.h1+=1
        for key in ('href','src'):
            if a.get(key): self.links.append(a[key])
        if tag=='script' and a.get('type')=='application/ld+json': self.in_json=True; self.json=''
    def handle_endtag(self,tag):
        if tag=='script' and self.in_json: json.loads(self.json); self.in_json=False
    def handle_data(self,data):
        if self.in_json: self.json+=data

def main():
    parser=argparse.ArgumentParser(); parser.add_argument('--base-url'); args=parser.parse_args()
    root=Path(__file__).resolve().parent
    docs={p:Document(p.read_text(encoding='utf-8')) for p in root.rglob('*.html') if not any(x in p.parts for x in ('.git','node_modules'))}
    errors=[]; count=0
    for path,doc in docs.items():
        if 'licencias' not in path.parts and doc.h1!=1: errors.append(f'{path.name}: expected one h1')
        for link in doc.links:
            parts=urlsplit(link)
            if parts.scheme or parts.netloc: continue
            target=root/parts.path.lstrip('/') if parts.path.startswith('/') else (path.parent/parts.path if parts.path else path)
            if target.is_dir(): target=target/'index.html'
            if not target.exists(): errors.append(f'{path.name}: missing {link}'); continue
            if parts.fragment and target in docs and unquote(parts.fragment) not in docs[target].ids: errors.append(f'{path.name}: missing anchor {link}')
            count+=1
    ET.fromstring((root/'sitemap.xml').read_text(encoding='utf-8'))
    plans=(root/'planes.html').read_text(encoding='utf-8')
    for value in ('2.000','7.000','19.000','$159.000','$429.000','$1.090.000','$79.500','$214.500','$545.000','después de la entrega','WhatsApp incluido'):
        if value not in plans: errors.append(f'planes.html: expected {value}')
    if args.base_url:
        for file in ('index.html','atlas.html','planes.html','implementacion.html','nosotros.html','web.html','demo.html','privacidad.html','terminos.html','eliminacion-datos.html','licencias/','assets/site.css','assets/site.js','assets/demo.js','assets/demo-fixes.css','sitemap.xml','robots.txt'):
            with urllib.request.urlopen(args.base_url.rstrip('/')+'/'+file,timeout=20) as response:
                if response.status!=200: errors.append(f'HTTP {response.status}: {file}')
    print(json.dumps({'html_files':len(docs),'local_references':count,'errors':errors},ensure_ascii=False,indent=2))
    return 1 if errors else 0

if __name__=='__main__': raise SystemExit(main())

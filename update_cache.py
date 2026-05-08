import glob, re
for f in glob.glob('*.html'):
    with open(f, 'r') as file:
        content = file.read()
    
    content = re.sub(r'href="style\.css(\?v=\d+)?"', 'href="style.css?v=3"', content)
    content = re.sub(r'src="script\.js(\?v=\d+)?"', 'src="script.js?v=3"', content)
    
    with open(f, 'w') as file:
        file.write(content)

import glob, re
html_files = glob.glob('*.html')
new_footer_services = """            <div class="footer-links">
                <h4>Services</h4>
                <ul>
                    <li><a href="index.html#services">Lead Gen (Google & Meta)</a></li>
                    <li><a href="index.html#services">Display Ads & YouTube</a></li>
                    <li><a href="index.html#services">Web Creation & Deployment</a></li>
                    <li><a href="index.html#services">Dialer & Call Center Setups</a></li>
                </ul>
            </div>"""
for f in html_files:
    with open(f, 'r') as file:
        content = file.read()
    content = re.sub(r'<div class="footer-links">\s*<h4>Services</h4>\s*<ul>.*?</ul>\s*</div>', new_footer_services, content, flags=re.DOTALL)
    with open(f, 'w') as file:
        file.write(content)

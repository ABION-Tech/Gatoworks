# Test locally in VS Code before going live

1. Open this folder in VS Code (File > Open Folder).
2. Install the extension "Live Server" (by Ritwick Dey) if you don't have it.
3. Right-click `admin.html` > "Open with Live Server".
   It opens at http://127.0.0.1:5500/admin.html (the number may differ).
4. You are in LOCAL TEST MODE (green bar at the top). No sign-in is needed and
   nothing touches your live site: edits are saved in this browser only.
   Open http://127.0.0.1:5500/index.html in the same browser to see the public
   pages with your test edits applied.
5. "Clear test edits" in the green bar wipes everything you tried.
6. To work on the real site from your computer instead, add ?live to the address:
   http://127.0.0.1:5500/admin.html?live  (this DOES change the live site).

When happy, upload the folder to GitHub as before. Test edits do not carry over;
redo the ones you want at https://gatoworks.com.ng/admin.html.

No VS Code extension? In a terminal inside this folder run:  python -m http.server 5500
then open http://localhost:5500/admin.html

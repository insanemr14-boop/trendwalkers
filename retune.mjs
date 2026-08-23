import fs from 'fs';
let c = fs.readFileSync('style.css','utf8');
const map = {
  '#1C1A17':'#0C0E15', '#FDFBF7':'#FFFFFF', '#F2EBDF':'#F7F8FA',
  '#E3D9C8':'#D4D6D8', '#6E6459':'#6A6D76', '#B4552D':'#D64218',
  '#8F3F1E':'#AE3411', '#2C3E33':'#243447', '#7C8F76':'#BEDBE0',
  '#C08B2E':'#BEDBE0', '#C6CEC2':'#C9D1DC', '#E0AE55':'#BEDBE0',
};
for (const [a,b] of Object.entries(map)) {
  c = c.split(a).join(b);
  c = c.split(a.toLowerCase()).join(b);
}
c = c.replace(/rgba\(253,\s*251,\s*247,/g, 'rgba(255,255,255,');
const STACK = `'Gilroy',"Segoe UI",system-ui,-apple-system,sans-serif`;
c = c.replace(/'Fraunces'[^;}]*/g, STACK).replace(/'Karla'[^;}]*/g, STACK);
c = c.replace(/font-optical-sizing:[^;]*;/g, '').replace(/font-variation-settings:[^;]*;/g, '');
c += `

/* ---------- inner-page fit under the Saltwave chrome ---------- */
.inner-page main{padding-top:24px}
.inner-page main section:first-child{padding-top:48px}
.inner-page .wrap{max-width:1180px;margin:0 auto;padding:0 22px}
.inner-page .card{background:#fff}
`;
fs.writeFileSync('style.css', c);
console.log('palette remapped, fonts unified to Gilroy');

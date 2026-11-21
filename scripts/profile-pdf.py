import sys
from pathlib import Path
from reportlab.pdfgen import canvas
from reportlab.lib.utils import ImageReader

work, output, stem, count = sys.argv[1:]
pdf = canvas.Canvas(str(Path(output) / f"{stem}.pdf"), pagesize=(960, 540))
pdf.setTitle("Railwheel Company Profile")
pdf.setAuthor("Ma'anshan Railwheel Industrial Technology Co., Ltd.")
for number in range(1, int(count) + 1):
    pdf.drawImage(ImageReader(str(Path(work) / f"{stem}-{number}.png")), 0, 0, width=960, height=540)
    pdf.showPage()
pdf.save()

## PDF Filler

PDF Filler is microservice for filling and converting DOCX files to PDF. It uses:

- [Gotenbert](https://github.com/thecodingmachine/gotenberg) to convert DOCX files to PDF
- [docxtemplater](https://www.npmjs.com/package/docxtemplater) for simple docx filling
- [docx-templates](https://www.npmjs.com/package/docx-templates) for advanced docx filling (images, for example)

### Documentation

- https://pdf.fitnow.io/api/v1/swagger
- http://localhost:5000/api/v1/swagger (in development mode)

### Development

To run local instance of pdf filler run following commands:

- `git clone https://gitlab.com/fitnow/pdf-filler`
- `cd pdf-filler`
- `cp .env.example .env`
- `npm i`
- `docker-compose up`

Additionaly create Google Cloud Service account JSON key and save it on `./google-key.json` location

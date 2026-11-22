# Cursos de Pedagogia (semipresencial / EaD) perto da Mooca e da Vila Mariana — São Paulo

Site estático com duas abas:

- **Mapa** (`index.html`): polos de Pedagogia (licenciatura) como alfinetes no mapa de São Paulo, com anéis de 1, 3 e 5 km a partir dos CEPs **03167-030** (Rua dos Capitães Mores, Mooca) e **04018-010** (Rua Dr. Álvaro Alvim, Vila Mariana). Clique num alfinete para ver os dados do curso.
- **Tabela de cursos** (`tabela.html`): todas as ofertas, ordenáveis, com mensalidade, preço cheio, formato, turno, semestre de ingresso, duração, vagas, avaliação MEC, alertas e fonte, além da metodologia e das limitações.

Os filtros (raio, CEP de referência, formato, mensalidade máxima, busca) são compartilhados entre as duas abas.

## Publicar no GitHub Pages

Settings → Pages → *Build and deployment* → Source: **Deploy from a branch** → Branch: **main** / **(root)** → Save.
O site fica em `https://agracioso.github.io/cursos-pedagogia-cidade-sao-paulo/`.

## Dados

- `dados/cursos.json` — uma linha por oferta (IES + polo + formato + preço).
- `assets/dados.js` — o mesmo conteúdo, carregado pelas páginas (funciona também abrindo o arquivo localmente).
- `dados/distritos-sp.geojson` — distritos do município (simplificado a partir de [codigourbano/distritos-sp](https://github.com/codigourbano/distritos-sp)).

Levantamento em 22/11/2026. Fontes: páginas públicas do portal EAD.com.br / Quero Bolsa (ofertas, preços com desconto de plataforma e coordenadas dos polos) e páginas oficiais de Belas Artes, Unicesumar, Mackenzie (edital 2026.2) e Univesp. Distâncias em linha reta (Haversine) a partir da geocodificação dos CEPs no OpenStreetMap/Nominatim.

**Qualidade:** Conceito Enade das Licenciaturas 2025 (Inep, planilha de 25/05/2026), área Pedagogia, curso EaD de cada instituição — extrato em `dados/enade_licenciaturas_2025_pedagogia.json`. O conceito é do curso, não do polo.

**Limitações:** vagas por polo não são divulgadas pelas IES privadas; o vínculo marca→instituição é provável (Estácio, FAM) ou múltiplo (Anhanguera) em alguns casos; 19 ofertas de marcas menores ficaram sem nota; preços mudam com frequência. Confirme tudo diretamente com a instituição antes de se matricular.

Mapa: [Leaflet](https://leafletjs.com) 1.9.4 (BSD-2, incluído em `assets/vendor/`) e OpenStreetMap.

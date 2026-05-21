# RCV-Digital Web — Sistema de Publicación Automatizada

Sitio estático en HTML puro. Deploy automático via Cloudflare Pages en cada push a `main`.

**URL en producción:** https://www.rcv-digital.com  
**Costo total del sistema:** USD 0/mes

---

## Arquitectura

```
Claude.ai (Agente Redactor)
    ↓ genera JSON con artículo + newsletter
Tú (copias el JSON, Run once en Make)
    ↓
Make.com (orquestador)
    ├── GitHub API → sube artículo + actualiza publicaciones.html
    ├── Cloudflare Pages (auto-deploy en cada push a main)
    ├── Beehiiv → crea borrador del newsletter
    ├── Google Sheets → marca tema como PUBLICADO
    └── Gmail → te notifica
```

---

## Flujo semanal (lunes + martes)

### LUNES — Generar contenido (5 minutos)

1. Abre Claude.ai → el Proyecto "RCV Redactor"
2. Escribe: `Genera el contenido para esta semana. Tema: [próximo PENDIENTE del Sheets]`
3. Claude genera el JSON completo con artículo + newsletter
4. Revisa título y resumen (30 segundos)
5. Si apruebas: **copia el JSON completo**

### LUNES — Publicar (2 minutos)

6. Ve a [Make.com](https://make.com) → Escenario **"RCV — Publicar blog + newsletter"**
7. Haz clic en **Run once** (triángulo ▶)
8. Cuando pida datos en el webhook, pega el JSON en:
   **`https://hook.us2.make.com/qghi77smo0du3g8rzb9aam64w2y1q2xy`**
9. Make ejecuta automáticamente:
   - ✅ Artículo HTML subido a GitHub → Cloudflare despliega en 2 min
   - ✅ Borrador creado en Beehiiv
   - ✅ Tema marcado PUBLICADO en Sheets
   - ✅ Email de confirmación con el `card_html` listo para pegar
10. **Paso manual (30 seg):** abre el link de GitHub del email → busca `<!-- INSERT-NEW-CARD -->` → pega el `card_html` debajo → Commit

### MARTES 8am — Enviar newsletter (30 segundos)

11. Abre [Beehiiv](https://app.beehiiv.com) → ves el borrador
12. Revisa que todo se vea bien
13. Clic en **"Send"** → sale a toda la lista

---

## Gestión de temas

Google Sheets: [Abrir planilla](https://docs.google.com/spreadsheets/d/1vkR76VyiE_vB5ylIP40dy6-If9r9MyOuXkc3EUtw3tg)

- **TEMAS**: pipeline de artículos. Columna `estado` = `[PENDIENTE]` o `PUBLICADO`
- **SUSCRIPTORES**: se llena automáticamente cuando alguien llena el formulario web

---

## Archivos del repositorio

| Archivo | Descripción |
|---|---|
| `index.html` | Landing page principal |
| `publicaciones.html` | Listado de artículos (se actualiza automáticamente) |
| `art-*.html` | Artículos individuales |
| `privacy.html` / `terms.html` | Páginas legales |
| `_headers` | Headers de seguridad para Cloudflare |
| `_redirects` | Redirecciones |
| `sitemap.xml` | Sitemap para SEO |

**Nota:** `publicaciones.html` tiene el comentario `<!-- INSERT-NEW-CARD -->` como punto de inserción. Make.com inyecta el nuevo card ahí. No borrar ese comentario.

---

## Archivos de configuración (NO van al sitio en producción)

| Archivo | Uso |
|---|---|
| `AGENTE-REDACTOR-PROMPT.txt` | Pegar en Claude.ai → New Project → Instructions |
| `MAKE-Escenario-Suscriptores.json` | Importar en Make.com (Escenario 1) |
| `MAKE-Escenario-Publicar.json` | Importar en Make.com (Escenario 2) |
| `setup-google-sheets.js` | Correr en Apps Script para poblar las hojas |
| `SETUP-GUIDE.md` | Instrucciones paso a paso de configuración |

---

## Anti-spam y calidad de lista

- **Double opt-in**: activar en Beehiiv → Settings → Subscription
- **Duplicados**: Beehiiv los maneja con `reactivate_existing: true`
- **Unsubscribe**: incluido automáticamente en cada email por Beehiiv
- **Frecuencia**: máximo 1 email semanal
- **SPF/DKIM**: verificar dominio en Beehiiv → Settings → Domains → agregar registros en Cloudflare DNS

---

## URLs y referencias del sistema

| Recurso | URL / ID |
|---|---|
| **Sitio web** | https://www.rcv-digital.com |
| **GitHub repo** | https://github.com/rcvdigitalma-sketch/rcv-digital-web |
| **Webhook publicación** | `https://hook.us2.make.com/qghi77smo0du3g8rzb9aam64w2y1q2xy` |
| **Webhook suscriptores** | `https://hook.us2.make.com/opkxs7bppu8xiwyjuij28z54dt7wxjgl` |
| **Google Sheets** | https://docs.google.com/spreadsheets/d/1vkR76VyiE_vB5ylIP40dy6-If9r9MyOuXkc3EUtw3tg |
| **Beehiiv** | https://app.beehiiv.com (pub: `328b9ce7-1a7d-4f76-a38f-5a0a62fad2e2`) |
| **Formspree form** | `mgoproyy` → https://formspree.io/forms/mgoproyy |
| **Cloudflare Pages** | `rcvdigital` (Account: `6bf7f4d8cfe325f6a84e4a9f54bb033d`) |
| **Gmail** | `rcvdigitalma@gmail.com` |

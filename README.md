# La Principal del Llobregat

Web oficial de la cobla La Principal del Llobregat, fundada a Cornellà de Llobregat l’any 1929.

## Continguts

- Pàgina d’inici i presentació de la cobla
- Agenda amb mapa de Catalunya i calendari Google
- Arxiu d’actuacions amb cròniques, fotografies i vídeos
- Història i cronologia de la formació

## Editar l’agenda i les actuacions

Les dades que canvien sovint són a [`app/data.ts`](app/data.ts). Cada entrada inclou la data, el municipi, el tipus d’actuació i un enllaç a la font o al material audiovisual.

## Connectar Google Calendar

1. A Google Calendar, fes públic el calendari de la cobla.
2. Copia’n l’identificador a **Configuració i compartició → Integra el calendari**.
3. Al repositori de GitHub, ves a **Settings → Secrets and variables → Actions → Variables**.
4. Crea la variable `GOOGLE_CALENDAR_ID` amb l’identificador. La publicació següent mostrarà automàticament el calendari real.

## Publicació a GitHub Pages

El flux `.github/workflows/deploy-pages.yml` construeix i publica el web cada vegada que hi ha canvis a `main`. A **Settings → Pages**, la font de publicació ha de ser **GitHub Actions**.

## Domini propi

Quan disposeu del domini:

1. Afegiu-lo a **Settings → Pages → Custom domain**.
2. Creeu la variable de repositori `CUSTOM_DOMAIN` amb el domini complet, per exemple `www.lallobregat.cat`.
3. Configureu els registres DNS que indiqui GitHub.

## Desenvolupament local

Requereix Node.js 22 o posterior.

```bash
pnpm install
pnpm run dev
```

El web estarà disponible a `http://localhost:3000`.

La construcció final crea una exportació completament estàtica compatible amb GitHub Pages, inclosos els accessos directes a `/agenda`, `/actuacions` i `/historia`.

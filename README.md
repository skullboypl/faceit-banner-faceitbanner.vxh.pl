# FACEIT Stats Widget (Skull)

Widget dla **[OBS Studio](https://obsproject.com/)** wyświetlający statystyki **[FACEIT](https://faceit.com)** (ELO, poziom, zmiana ELO, średnie statystyki).

**Live:** [faceitbanner.vxh.pl](https://faceitbanner.vxh.pl/)

Ten projekt **nie jest powiązany** z FACEIT.

## Pochodzenie i licencja

Ten repozytorium jest **pochodną** (fork z modyfikacjami) projektu [**mxgic1337/faceit-stats-widget**](https://github.com/mxgic1337/faceit-stats-widget), udostępnionego na licencji [**MIT**](https://github.com/mxgic1337/faceit-stats-widget/blob/main/LICENSE).

Zgodnie z MIT, w dystrybucji zachowujemy oryginalne informacje o prawach autorskich i licencji. Pełny tekst licencji (łącznie z atrybucją oryginału i modyfikacji) znajduje się w pliku [LICENSE](./LICENSE).

| | |
|---|---|
| Oryginał | [github.com/mxgic1337/faceit-stats-widget](https://github.com/mxgic1337/faceit-stats-widget) |
| Ta wersja | [github.com/skullboypl/faceit-banner-faceitbanner.vxh.pl](https://github.com/skullboypl/faceit-banner-faceitbanner.vxh.pl) |
| Autor modyfikacji | [Skull](https://github.com/skullboypl) |

Ikony Tabler (jeśli używane w projekcie) — zobacz [LICENSE-TABLER-ICONS](./LICENSE-TABLER-ICONS).

## Stack technologiczny

| Warstwa | Technologia |
|--------|-------------|
| UI | **React 18** + **TypeScript** |
| Routing | **react-router-dom** |
| Bundler / dev server | **Vite 7** (`@vitejs/plugin-react-swc`) |
| Style | **Less** |
| Pakiety | **pnpm** |
| Produkcja | statyczny build (`dist/`) serwowany przez **nginx** (Docker / CapRover) |

Aplikacja ma dwa wejścia Vite: generator (`/`) i embed widgetu OBS (`/widget/`). Wiki to statyczne HTML w `public/wiki/`.

## Lokalnie

```bash
pnpm install
cp .env.example .env   # uzupełnij VITE_FACEIT_API_KEY
pnpm dev
pnpm build
pnpm preview
```

Wymagania: Node.js 18+ (zalecane 22), [pnpm](https://pnpm.io/).

## Deploy na CapRover

1. W CapRover utwórz aplikację (np. `faceit-banner`).
2. **Deployment** → **Deploy via Dockerfile** (repo z `captain-definition` + `Dockerfile`).
3. W **App Configs → Environment Variables** ustaw `VITE_FACEIT_API_KEY` (klucz API FACEIT — wymagany przy buildzie obrazu).
4. Włącz **HTTPS** i przypisz domenę.
5. Deploy z brancha `main`.

Reguły URL (SPA, `/wiki/`, `/widget/`, przekierowanie `bannerfaceitobs`) są w `deploy/nginx.conf`.

### Build lokalny obrazu (test)

```bash
docker build --build-arg VITE_FACEIT_API_KEY=twoj-klucz -t faceit-banner .
docker run --rm -p 8080:80 faceit-banner
# http://localhost:8080
```

## OBS

Wygeneruj link w generatorze na stronie, dodaj w OBS źródło **Browser** i wklej URL widgetu.

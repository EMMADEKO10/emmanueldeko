# MonPortfolio

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.0.7.

## 🤖 Chatbot IA Intégré

Le portfolio inclut un chatbot IA intelligent qui peut répondre aux questions sur Emmanuel Deko, ses compétences, ses projets et son parcours professionnel.

### Fonctionnalités du Chatbot :
- **Réponses intelligentes** sur les compétences techniques d'Emmanuel
- **Informations détaillées** sur ses projets (Diasporium, système de bourses RDC)
- **Guidance de contact** pour les opportunités professionnelles
- **Interface moderne** avec animations fluides
- **Responsive design** qui s'adapte à tous les écrans

### Configuration OpenAI (Optionnelle) :
Pour utiliser l'IA OpenAI au lieu des réponses prédéfinies :
1. Ajouter `OPENAI_API_KEY` dans les variables d'environnement
2. Le chatbot basculera automatiquement vers OpenAI si configuré
3. Sinon, il utilise un système de réponses prédéfinies intelligent

### Technologies du Chatbot :
- **Frontend** : Angular 18, TypeScript, Animations CSS
- **Backend** : Express.js, API REST
- **IA** : OpenAI GPT-3.5-turbo (optionnel) + Réponses prédéfinies

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

```
mon-portfolio
├─ .angular
├─ .editorconfig
├─ .git
│  ├─ COMMIT_EDITMSG
│  ├─ config
│  ├─ description
│  ├─ FETCH_HEAD
│  ├─ HEAD
│  ├─ hooks
│  │  ├─ applypatch-msg.sample
│  │  ├─ commit-msg.sample
│  │  ├─ fsmonitor-watchman.sample
│  │  ├─ post-update.sample
│  │  ├─ pre-applypatch.sample
│  │  ├─ pre-commit.sample
│  │  ├─ pre-merge-commit.sample
│  │  ├─ pre-push.sample
│  │  ├─ pre-rebase.sample
│  │  ├─ pre-receive.sample
│  │  ├─ prepare-commit-msg.sample
│  │  ├─ push-to-checkout.sample
│  │  ├─ sendemail-validate.sample
│  │  └─ update.sample
│  ├─ index
│  ├─ info
│  │  └─ exclude
│  ├─ logs
│  │  ├─ HEAD
│  │  └─ refs
│  │     └─ heads
│  │        └─ master
│  ├─ objects
│  │  ├─ 04
│  │  │  └─ 495eaece82188ece2b9293aaadeac1ce951a18
│  │  ├─ 06
│  │  │  └─ c1d704ed8806af710a98d05068d22adbee3aed
│  │  ├─ 08
│  │  │  ├─ d3fe1e0333af545d5990b777f7a2bedcba6e34
│  │  │  └─ dabd812bba52ff5a1893961453d9d11b00a3f7
│  │  ├─ 10
│  │  │  └─ d066f35a22aa8094b8d517242f3434a174f868
│  │  ├─ 1a
│  │  │  └─ 0df5e067814f87ff8c313574f79c63ac17d3b1
│  │  ├─ 33
│  │  │  └─ aaeb9f5819d05046624ca73fce01372f1c952c
│  │  ├─ 35
│  │  │  └─ b00f3463311f2afe0fd0d9d5f696dbb992dff5
│  │  ├─ 36
│  │  │  └─ 093e1879779624f181733152bb55d71a711d3b
│  │  ├─ 4b
│  │  │  └─ 9d4d1545c1ab47af505ed30db385044f56df16
│  │  ├─ 51
│  │  │  └─ 8bd4d6009c9e59b2fd1c661225b09d488cc93f
│  │  ├─ 52
│  │  │  └─ cd710c6c090668c4ee8282b3bc68f5870f7476
│  │  ├─ 57
│  │  │  └─ 614f9c967596fad0a3989bec2b1deff33034f6
│  │  ├─ 59
│  │  │  └─ d9a3a3e73ffc640517ef488f6f89d6270195d1
│  │  ├─ 5f
│  │  │  └─ b748d9207a99686549d6ef1415527dc544dd0f
│  │  ├─ 66
│  │  │  └─ 3f8d81d5ae55c0e1d1a1aa8a53b87ff3d86eb7
│  │  ├─ 77
│  │  │  └─ b374577de83b86d846eadda2dd17532d7dabaa
│  │  ├─ 7f
│  │  │  └─ ac1e36beb23280274d3d553178f1947a487df5
│  │  ├─ 88
│  │  │  └─ 6852b87a706f6df693444125b8d71106679353
│  │  ├─ 90
│  │  │  └─ d4ee0072ce3fc41812f8af910219f9eea3c3de
│  │  ├─ 92
│  │  │  └─ 5af837050a4abe679c5fea0df7e41faf6fc011
│  │  ├─ a2
│  │  │  └─ 98b5bd8796ac377fe9ed64caa249e24c7ec3b6
│  │  ├─ b3
│  │  │  └─ f1ecf44a54372bf90afbb60491417242b8769c
│  │  ├─ b4
│  │  │  └─ d57c94235f8af487a209ce944e62ffdfdac8c2
│  │  ├─ cc
│  │  │  └─ 7b141350ffde43afce3ec16ea4d7b5007cde2b
│  │  ├─ cd
│  │  │  └─ c0b287f5dcddd808e55e1729efd6742fc621b6
│  │  ├─ d3
│  │  │  └─ dbc4a2dd116ddac645f9dae2fb11103ff5c683
│  │  ├─ dc
│  │  │  ├─ 39edb5f23a35f788cba146dd7337127ba6c5ab
│  │  │  └─ e225f342456ef607793f89d4af7a5aa329cb38
│  │  ├─ e1
│  │  │  └─ 9d34fa0e0bc9292281dbe2dfe3d37499bed5c5
│  │  ├─ e6
│  │  │  └─ 9de29bb2d1d6434b8b29ae775ad8c2e48c5391
│  │  ├─ info
│  │  └─ pack
│  └─ refs
│     ├─ heads
│     │  └─ master
│     └─ tags
├─ .gitignore
├─ angular.json
├─ package-lock.json
├─ package.json
├─ public
│  └─ favicon.ico
├─ README.md
├─ server.ts
├─ src
│  ├─ app
│  │  ├─ app.component.css
│  │  ├─ app.component.html
│  │  ├─ app.component.spec.ts
│  │  ├─ app.component.ts
│  │  ├─ app.config.server.ts
│  │  ├─ app.config.ts
│  │  ├─ app.module.ts
│  │  ├─ app.routes.ts
│  │  └─ components
│  │     ├─ about
│  │     │  ├─ about.component.css
│  │     │  ├─ about.component.html
│  │     │  ├─ about.component.spec.ts
│  │     │  └─ about.component.ts
│  │     ├─ contact
│  │     │  ├─ contact.component.css
│  │     │  ├─ contact.component.html
│  │     │  ├─ contact.component.spec.ts
│  │     │  └─ contact.component.ts
│  │     ├─ footer
│  │     │  ├─ footer.component.css
│  │     │  ├─ footer.component.html
│  │     │  ├─ footer.component.spec.ts
│  │     │  └─ footer.component.ts
│  │     ├─ header
│  │     │  ├─ header.component.css
│  │     │  ├─ header.component.html
│  │     │  ├─ header.component.spec.ts
│  │     │  └─ header.component.ts
│  │     ├─ home
│  │     │  ├─ home.component.css
│  │     │  ├─ home.component.html
│  │     │  ├─ home.component.spec.ts
│  │     │  └─ home.component.ts
│  │     └─ projects
│  │        ├─ projects.component.css
│  │        ├─ projects.component.html
│  │        ├─ projects.component.spec.ts
│  │        └─ projects.component.ts
│  ├─ asset
│  ├─ environment
│  ├─ index.html
│  ├─ main.server.ts
│  ├─ main.ts
│  ├─ style
│  │  └─ _typography.css
│  └─ styles.css
├─ tailwind.config.js
├─ tsconfig.app.json
├─ tsconfig.json
└─ tsconfig.spec.json

```
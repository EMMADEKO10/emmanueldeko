# 📧 Documentation Email - Formulaire de Contact

## Vue d'ensemble

Cette fonctionnalité permet d'envoyer des emails via le formulaire de contact du portfolio. Elle utilise **Nodemailer** avec Gmail SMTP et un système de templates HTML personnalisables.

## Architecture

```
src/
├── api/
│   └── email.ts                    # Route API et logique d'envoi d'emails
├── lib/
│   └── email-templates/
│       ├── contact-notification.html   # Template pour l'email de notification (à Emmanuel)
│       └── contact-confirmation.html   # Template pour l'email de confirmation (à l'expéditeur)
└── app/
    └── services/
        └── contact.service.ts      # Service Angular pour l'appel API
```

## Configuration

### 1. Variables d'environnement

Créez un fichier `.env.local` à la racine du projet :

```env
EMAIL_USER=emmanueldeko64@gmail.com
EMAIL_PASSWORD=xcym ejub xsrl vsgb
```

⚠️ **Important** : Le mot de passe doit être un **Mot de passe d'application Gmail**, pas votre mot de passe principal.

### 2. Générer un mot de passe d'application Gmail

1. Allez sur https://myaccount.google.com/security
2. Activez la **Validation en deux étapes** si ce n'est pas déjà fait
3. Recherchez **Mots de passe des applications**
4. Sélectionnez **Courrier** comme application
5. Copiez le mot de passe généré (format: `xxxx xxxx xxxx xxxx`)
6. Remplacez la valeur `EMAIL_PASSWORD` dans `.env.local`

## Fonctionnalités

### ✅ Email de notification (à Emmanuel)

Lorsqu'un utilisateur envoie un message :
- ✉️ Emmanuel reçoit un email professionnel avec :
  - Les informations du contact (nom, email)
  - Le sujet du message
  - Le contenu du message
  - Un bouton "Répondre" qui ouvre directement le client email
  - La date et l'heure d'envoi

### ✅ Email de confirmation (à l'expéditeur)

L'expéditeur reçoit automatiquement un email de confirmation :
- ✉️ Confirmation de réception du message
- 📝 Récapitulatif du message envoyé
- 🔗 Lien vers le portfolio
- ⏱️ Délai de réponse estimé (24-48h)

## Configuration SMTP

```typescript
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,              // Port SMTP standard
  secure: false,          // TLS (pas SSL)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});
```

## Templates HTML

Les templates utilisent un système de variables avec la syntaxe `{{variable}}`.

### Variables disponibles

#### Template `contact-notification.html`
- `{{name}}` : Nom de l'expéditeur
- `{{email}}` : Email de l'expéditeur
- `{{subject}}` : Sujet du message
- `{{message}}` : Contenu du message
- `{{date}}` : Date et heure d'envoi (format: lundi 16 décembre 2025 à 14:30)
- `{{year}}` : Année actuelle

#### Template `contact-confirmation.html`
- `{{name}}` : Nom de l'expéditeur
- `{{subject}}` : Sujet du message
- `{{message}}` : Contenu du message
- `{{year}}` : Année actuelle

### Personnaliser les templates

1. Éditez les fichiers dans `src/lib/email-templates/`
2. Utilisez la syntaxe `{{variable}}` pour les données dynamiques
3. Les templates supportent le HTML et CSS inline

## API

### Endpoint: `POST /api/contact`

#### Request Body
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Demande de collaboration",
  "message": "Bonjour, je souhaiterais discuter d'un projet..."
}
```

#### Response (Success)
```json
{
  "success": true,
  "message": "Message envoyé avec succès ! Vous recevrez une confirmation par email.",
  "messageId": "<unique-message-id>"
}
```

#### Response (Error)
```json
{
  "success": false,
  "error": "Description de l'erreur"
}
```

### Codes d'erreur
- `400` : Données manquantes ou format d'email invalide
- `500` : Erreur serveur lors de l'envoi

## Utilisation dans Angular

```typescript
import { ContactService } from './services/contact.service';

// Dans votre composant
constructor(private contactService: ContactService) {}

sendMessage() {
  const formData = {
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Demande d'information',
    message: 'Bonjour...'
  };

  this.contactService.sendContactMessage(formData).subscribe({
    next: (response) => {
      console.log('✅ Message envoyé:', response);
    },
    error: (error) => {
      console.error('❌ Erreur:', error);
    }
  });
}
```

## Sécurité

### ✅ Bonnes pratiques implémentées

1. **Variables d'environnement** : Les credentials ne sont jamais dans le code
2. **Validation des données** : Vérification de tous les champs obligatoires
3. **Validation email** : Regex pour vérifier le format
4. **Mot de passe d'application** : Utilisation de mots de passe spécifiques Gmail
5. **TLS/SSL** : Connexion sécurisée avec Gmail
6. **replyTo** : L'adresse de réponse est celle de l'expéditeur

### 🔒 À ne pas faire

- ❌ Ne committez jamais le fichier `.env.local`
- ❌ N'utilisez jamais votre mot de passe Gmail principal
- ❌ Ne partagez jamais vos mots de passe d'application
- ❌ N'ajoutez pas `.env.local` dans Git (déjà dans `.gitignore`)

## Dépannage

### L'email ne part pas

1. **Vérifier les credentials**
   ```bash
   # Dans server.ts ou email.ts, ajouter temporairement :
   console.log('EMAIL_USER:', process.env.EMAIL_USER);
   console.log('EMAIL_PASSWORD exists:', !!process.env.EMAIL_PASSWORD);
   ```

2. **Vérifier les logs**
   - Regardez les logs du serveur pour les erreurs
   - Vérifiez que le template HTML est correctement chargé

3. **Tester avec un compte test**
   - Créez un compte Gmail de test
   - Générez un nouveau mot de passe d'application
   - Testez avec ce compte

### Erreur "Invalid login"

- Le mot de passe d'application est incorrect
- La validation en 2 étapes n'est pas activée sur Gmail
- Le compte Gmail a des paramètres de sécurité restrictifs

### Template non trouvé

- Vérifiez que les fichiers `.html` sont dans `src/lib/email-templates/`
- Vérifiez le chemin dans `loadEmailTemplate()`
- Assurez-vous que les fichiers sont inclus dans le build

## Tests

### Test manuel

1. Lancez le serveur : `npm start`
2. Ouvrez le formulaire de contact
3. Remplissez et envoyez un message
4. Vérifiez :
   - Les logs du serveur
   - Votre boîte de réception (emmanueldeko64@gmail.com)
   - La boîte de réception de l'expéditeur

### Test avec curl

```bash
curl -X POST http://localhost:4200/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test",
    "message": "Ceci est un test"
  }'
```

## Support

Pour toute question ou problème :
- 📧 Email : emmanueldeko64@gmail.com
- 🐛 Issues : Créez une issue sur le repository

## Logs utiles

Les logs vous aideront à déboguer :

```
✅ Email envoyé avec succès: <message-id>
📧 Destinataire: emmanueldeko64@gmail.com
📝 Sujet: 📬 Nouveau message de...
✅ Email de confirmation envoyé à: user@example.com
```

En cas d'erreur :
```
❌ Erreur lors de l'envoi de l'email: [détails]
⚠️ Erreur lors de l'envoi de l'email de confirmation: [détails]
```

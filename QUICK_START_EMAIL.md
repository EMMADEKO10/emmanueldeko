# 🚀 Guide Rapide - Envoi d'Emails

## ✅ Ce qui a été implémenté

### 1. Configuration SMTP Gmail
- ✉️ Serveur : `smtp.gmail.com` (port 587)
- 🔐 Authentification : Mot de passe d'application Gmail
- 📧 Email de destination : `emmanueldeko64@gmail.com`

### 2. Système de Templates HTML
Deux templates professionnels créés :
- 📬 **contact-notification.html** : Email que VOUS recevez
- ✅ **contact-confirmation.html** : Email de confirmation pour l'expéditeur

### 3. Fichiers créés/modifiés

```
✅ Modifié  : src/api/email.ts (logique d'envoi)
✅ Créé     : src/lib/email-templates/contact-notification.html
✅ Créé     : src/lib/email-templates/contact-confirmation.html
✅ Créé     : .env.local (configuration email)
✅ Créé     : .env.example (exemple de configuration)
✅ Créé     : test-email.js (script de test)
✅ Créé     : EMAIL_CONFIGURATION.md (documentation complète)
✅ Modifié  : package.json (ajout script test:email)
```

## 🎯 Comment tester ?

### Option 1 : Test automatique (Recommandé)
```bash
npm run test:email
```

Ce script va :
1. Vérifier la connexion SMTP
2. Envoyer un email de test à `emmanueldeko64@gmail.com`
3. Afficher les résultats dans le terminal

### Option 2 : Via le formulaire de contact
1. Lancez l'application : `npm start`
2. Allez sur la page Contact
3. Remplissez le formulaire
4. Envoyez le message
5. Vérifiez vos emails :
   - Vous recevrez la notification
   - L'expéditeur recevra la confirmation

## 📋 Checklist de vérification

Avant de tester, vérifiez que :

- [ ] Le fichier `.env.local` existe avec vos credentials
- [ ] Le mot de passe est un **mot de passe d'application Gmail**
- [ ] Les fichiers de templates existent dans `src/lib/email-templates/`
- [ ] `nodemailer` et `dotenv` sont installés (`npm install`)

## 🔧 Variables d'environnement

Fichier `.env.local` :
```env
EMAIL_USER=emmanueldeko64@gmail.com
EMAIL_PASSWORD=xcym ejub xsrl vsgb
```

⚠️ **Sécurité** :
- ✅ `.env.local` est déjà dans `.gitignore`
- ✅ Ne committez JAMAIS ce fichier
- ✅ Utilisez TOUJOURS un mot de passe d'application

## 📧 Flux d'emails

Quand quelqu'un envoie un message :

1. **Email de notification → Emmanuel** (`emmanueldeko64@gmail.com`)
   - Contient les infos du contact
   - Bouton "Répondre" direct
   - Template : `contact-notification.html`

2. **Email de confirmation → Expéditeur**
   - Confirme la réception
   - Récapitule le message
   - Template : `contact-confirmation.html`

## 🐛 Dépannage rapide

### L'email ne part pas ?

1. **Vérifier les credentials**
   ```bash
   # Vérifiez que les variables sont chargées
   node -e "require('dotenv').config({path:'.env.local'}); console.log(process.env.EMAIL_USER)"
   ```

2. **Vérifier la connexion SMTP**
   ```bash
   npm run test:email
   ```

3. **Regarder les logs du serveur**
   - Cherchez les messages `✅` ou `❌`
   - Les erreurs détaillées s'affichent dans la console

### Erreur "Invalid login" ?
- Le mot de passe d'application est incorrect
- Générez un nouveau mot de passe : https://myaccount.google.com/apppasswords

### Template non trouvé ?
- Vérifiez que les fichiers `.html` sont dans `src/lib/email-templates/`
- Les chemins sont case-sensitive sur certains systèmes

## 📚 Documentation complète

Pour plus de détails, consultez :
- `EMAIL_CONFIGURATION.md` : Documentation complète
- `EMAIL_SETUP.md` : Guide de configuration Gmail

## 🎨 Personnaliser les templates

Les templates sont dans `src/lib/email-templates/` :
- Éditez le HTML directement
- Utilisez `{{variable}}` pour les données dynamiques
- Testez avec `npm run test:email`

Variables disponibles :
- `{{name}}` : Nom de l'expéditeur
- `{{email}}` : Email de l'expéditeur
- `{{subject}}` : Sujet du message
- `{{message}}` : Contenu du message
- `{{date}}` : Date d'envoi
- `{{year}}` : Année actuelle

## ✨ Prochaines étapes

Pour améliorer encore plus :
- [ ] Ajouter des analytics (tracking d'ouverture)
- [ ] Créer plus de templates (newsletter, etc.)
- [ ] Ajouter un système de file d'attente pour les emails
- [ ] Implémenter une limite de taux (rate limiting)

## 💬 Support

En cas de problème :
1. Consultez `EMAIL_CONFIGURATION.md`
2. Exécutez `npm run test:email`
3. Vérifiez les logs du serveur

---

**Tout est prêt ! 🎉**

Lancez `npm run test:email` pour commencer !

# Configuration de l'envoi d'emails

## Prérequis

Pour que l'envoi d'emails fonctionne, vous devez configurer les variables d'environnement suivantes dans votre fichier `.env` :

```env
# Configuration Email (Gmail)
EMAIL_USER=emmanueldeko64@gmail.com
EMAIL_PASSWORD=your_gmail_app_password_here
```

## Configuration Gmail

### 1. Activer l'authentification à deux facteurs
- Allez dans les paramètres de votre compte Google
- Activez l'authentification à deux facteurs

### 2. Générer un mot de passe d'application
- Allez dans la sécurité de votre compte Google
- Dans "Connexion à Google", cliquez sur "Mots de passe d'application"
- Sélectionnez "Autre (nom personnalisé)" et nommez-le "Portfolio Contact"
- Copiez le mot de passe généré (16 caractères)

### 3. Configurer les variables d'environnement
- Créez un fichier `.env` à la racine du projet
- Ajoutez les variables suivantes :
  ```
  EMAIL_USER=emmanueldeko64@gmail.com
  EMAIL_PASSWORD=votre_mot_de_passe_d_application
  ```

## Test de l'envoi

Une fois configuré, vous pouvez tester l'envoi d'emails en :
1. Démarrant le serveur : `npm start`
2. Allant sur la page de contact
3. Remplissant le formulaire et l'envoyant

Les emails seront envoyés à `emmanueldeko64@gmail.com` avec un format HTML professionnel.

## Sécurité

- Ne jamais commiter le fichier `.env` dans Git
- Le mot de passe d'application est différent de votre mot de passe Gmail
- Vous pouvez révoquer les mots de passe d'application à tout moment 
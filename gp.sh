#!/bin/zsh


echo "Iniciando proceso de subida a GitHub..."

# Agregar los cambios al repositorio
git add .

# Confirmar los cambios con un mensaje de commit
echo -n "Ingrese el mensaje del commit: " 
read mensaje
git commit -m "$mensaje"

# Subir los cambios al repositorio remoto en GitHub
echo -n "Ingrese su nombre de usuario de GitHub: " 
read usuario
echo -n "Ingrese su contraseña de GitHub: " 
read -s contrasena
echo
git push https://$usuario:$contrasena@github.com/Damixn31/clientes-app.git


echo "Los cambios han sido subidos a GitHub exitosamente."

project_dir=$(pwd)

echo "Iniciando a configuração do projeto..."

if ! command -v npm &> /dev/null
then
    echo "npm não encontrado. Por favor, instale o Node.js e o npm para continuar."
    exit 1
fi

echo "Instalando dependências do backend..."
cd "$project_dir/backend" || exit
npm install

echo "Instalando dependências do frontend..."
cd "$project_dir/frontend" || exit
npm install

echo "Dependências instaladas com sucesso."

echo "Configuração inicial concluída. Seu ambiente de desenvolvimento está pronto."

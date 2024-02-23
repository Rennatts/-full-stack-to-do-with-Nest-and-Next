echo "Iniciando o backend e o frontend..."

echo "Iniciando o backend..."
cd ../backend
npm install
npm run start:dev &
cd ..


echo "Iniciando o frontend..."
cd frontend
npm install
npm run dev &
cd ..


echo "Backend e frontend estão sendo iniciados em background."

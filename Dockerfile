# Build aşaması
FROM node:18-alpine AS build

WORKDIR /app

# Bağımlılık dosyalarını kopyala ve yükle
COPY package*.json ./
RUN npm install

# Uygulama dosyalarını kopyala ve derle
COPY . .
RUN npm run build

# Production aşaması - NGINX ile yayınla
FROM nginx:alpine

# Vue Vite build çıktısı nginx'e kopyalanıyor
COPY --from=build /app/dist /usr/share/nginx/html

# Opsiyonel: Custom nginx config kullanmak istersen
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

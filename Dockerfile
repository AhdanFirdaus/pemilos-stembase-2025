# ===== Stage 1: Build frontend inside Laravel folder =====
FROM node:20 AS frontend

WORKDIR /var/www

# Copy Laravel project files first
COPY . .

# Install frontend dependencies & build
RUN npm install && npm run build


# ===== Stage 2: PHP runtime =====
FROM php:8.2-fpm

# Install PHP extensions
RUN apt-get update && apt-get install -y \
    libfreetype6-dev \
    libjpeg62-turbo-dev \
    libpng-dev \
    libonig-dev \
    libzip-dev \
    zip unzip git \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd pdo_mysql mbstring zip exif pcntl \
    && docker-php-ext-enable gd

WORKDIR /var/www

# Copy all Laravel source code
COPY . .

# Copy the built frontend assets from Node build
COPY --from=frontend /var/www/public ./public

# Set permissions
RUN chown -R www-data:www-data /var/www/ \
    && chmod -R 755 /var/www/storage

CMD ["php-fpm"]

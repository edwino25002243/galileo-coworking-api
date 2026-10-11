-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workplace_types" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,

    CONSTRAINT "workplace_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "first_name" VARCHAR(100) NOT NULL,
    "last_name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "personal_id" VARCHAR(50) NOT NULL,
    "payment_method" VARCHAR(50),
    "date_of_birth" DATE NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "fk_role_id" INTEGER NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workplaces" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "location" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "price_per_hour" DECIMAL(10,2) NOT NULL,
    "capacity" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "fk_workplace_type_id" INTEGER NOT NULL,

    CONSTRAINT "workplaces_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservas" (
    "id" SERIAL NOT NULL,
    "date" DATE NOT NULL,
    "start_time" TIME NOT NULL,
    "end_time" TIME NOT NULL,
    "total_price" DECIMAL(10,2) NOT NULL,
    "status" VARCHAR(30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "fk_user_id" INTEGER NOT NULL,
    "fk_workplace_id" INTEGER NOT NULL,

    CONSTRAINT "reservas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "amenities" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(100) NOT NULL,

    CONSTRAINT "amenities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workplace_amenities" (
    "fk_workplace_id" INTEGER NOT NULL,
    "fk_amenity_id" INTEGER NOT NULL,

    CONSTRAINT "workplace_amenities_pkey" PRIMARY KEY ("fk_workplace_id","fk_amenity_id")
);

-- CreateTable
CREATE TABLE "workplace_images" (
    "id" SERIAL NOT NULL,
    "image_url" TEXT NOT NULL,
    "is_main" BOOLEAN NOT NULL DEFAULT false,
    "fk_workplace_id" INTEGER NOT NULL,

    CONSTRAINT "workplace_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "workplace_types_name_key" ON "workplace_types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_personal_id_key" ON "usuarios"("personal_id");

-- CreateIndex
CREATE UNIQUE INDEX "amenities_name_key" ON "amenities"("name");

-- AddForeignKey
ALTER TABLE "usuarios" ADD CONSTRAINT "usuarios_fk_role_id_fkey" FOREIGN KEY ("fk_role_id") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workplaces" ADD CONSTRAINT "workplaces_fk_workplace_type_id_fkey" FOREIGN KEY ("fk_workplace_type_id") REFERENCES "workplace_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservas" ADD CONSTRAINT "reservas_fk_user_id_fkey" FOREIGN KEY ("fk_user_id") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservas" ADD CONSTRAINT "reservas_fk_workplace_id_fkey" FOREIGN KEY ("fk_workplace_id") REFERENCES "workplaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workplace_amenities" ADD CONSTRAINT "workplace_amenities_fk_workplace_id_fkey" FOREIGN KEY ("fk_workplace_id") REFERENCES "workplaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workplace_amenities" ADD CONSTRAINT "workplace_amenities_fk_amenity_id_fkey" FOREIGN KEY ("fk_amenity_id") REFERENCES "amenities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "workplace_images" ADD CONSTRAINT "workplace_images_fk_workplace_id_fkey" FOREIGN KEY ("fk_workplace_id") REFERENCES "workplaces"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

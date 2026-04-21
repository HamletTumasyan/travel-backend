-- CreateTable
CREATE TABLE "ContactPageFormContent" (
    "id" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "form_input_name_placeholder" TEXT NOT NULL,
    "form_input_email_placeholder" TEXT NOT NULL,
    "form_input_message_placeholder" TEXT NOT NULL,
    "btn_text" TEXT NOT NULL,
    "form_send_successfully" TEXT NOT NULL,
    "form_send_error" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ContactPageFormContent_pkey" PRIMARY KEY ("id")
);

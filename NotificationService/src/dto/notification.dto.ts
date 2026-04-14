export interface NotificationDto {
    to : string;                  // Email address of the recipient
    subject: string;               //subject of the email
    templateId: string;         //  ID of the email template to use
    params : Record<string, any>; // Parameters to be passed to the email template for dynamic content generation
}
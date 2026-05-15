<?php
// Check if form was submitted via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate inputs
    $full_name = filter_var(trim($_POST["full_name"]), FILTER_SANITIZE_STRING);
    $email = filter_var(trim($_POST["email"]), FILTER_VALIDATE_EMAIL);
    $phone = filter_var(trim($_POST["phone"]), FILTER_SANITIZE_STRING);
    $preferred_date = filter_var(trim($_POST["preferred_date"]), FILTER_SANITIZE_STRING);
    $additional_info = filter_var(trim($_POST["additional_info"]), FILTER_SANITIZE_STRING);

    // Basic validation
    if (empty($full_name) || !$email || empty($phone) || empty($preferred_date)) {
        echo "Please fill in all required fields correctly.";
        exit;
    }

    // Prepare email to daycare admin
    $to = "admin@happykidsdaycare.com"; // Change to your daycare email
    $subject = "New Tour Request from $full_name";
    $message = "You have received a new tour request:\n\n";
    $message .= "Name: $full_name\n";
    $message .= "Email: $email\n";
    $message .= "Phone: $phone\n";
    $message .= "Preferred Date: $preferred_date\n";
    $message .= "Additional Info: " . ($additional_info ?: "None") . "\n";

    $headers = "From: noreply@happykidsdaycare.com\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send email to admin
    $mail_sent = mail($to, $subject, $message, $headers);

    // Send confirmation email to user
    $user_subject = "Tour Request Confirmation - Happy Kids Daycare";
    $user_message = "Dear $full_name,\n\nThank you for scheduling a tour with Happy Kids Daycare. We have received your request for $preferred_date and will contact you shortly to confirm the details.\n\nBest regards,\nHappy Kids Daycare Team";
    $user_headers = "From: noreply@happykidsdaycare.com\r\n";

    $user_mail_sent = mail($email, $user_subject, $user_message, $user_headers);

    if ($mail_sent && $user_mail_sent) {
        echo "Thank you, $full_name! Your tour request has been submitted successfully.";
    } else {
        echo "Sorry, there was an error sending your request. Please try again later.";
    }
} else {
    // Redirect back to form if accessed directly
    header("Location: schedule-tour.html");
    exit;
}
?>

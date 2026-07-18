# Security Policy

Do not report vulnerabilities, credentials, personal data, patient data, Pass tokens, phone numbers, or transcripts in a public GitHub issue.

Use the official SGH contact form at https://phone.shingihou.com/support/contact and state that the message is a security report. Include only the minimum reproducible technical detail; SGH will provide a private channel if sensitive evidence is required.

The public repository contains no production credentials. Production deployments must use a secret manager for OAuth, SGH Service, Supabase, Twilio, LINE, email, payment and signing credentials.

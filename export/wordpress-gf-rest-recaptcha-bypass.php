<?php
/**
 * DeskTeam360 headless forms — skip GF reCAPTCHA on REST API submissions.
 *
 * Install: WordPress → Appearance → Theme File Editor → functions.php
 *          OR use a "Code Snippets" plugin and paste this file.
 *
 * Required when Next.js sets CONTACT_RECAPTCHA_SERVER_VERIFY=true:
 * Next.js verifies reCAPTCHA with Google, then submits to GF REST without a token.
 *
 * @see https://docs.gravityforms.com/submitting-forms-with-the-gfapi/#skip-recaptcha-validation-for-rest-api-submissions
 */
add_filter(
	'gform_field_validation',
	function ( $result, $value, $form, $field ) {
		if ( $field->type === 'captcha' && defined( 'REST_REQUEST' ) && REST_REQUEST ) {
			$result['is_valid'] = true;
			$result['message']  = '';
		}
		return $result;
	},
	10,
	4
);

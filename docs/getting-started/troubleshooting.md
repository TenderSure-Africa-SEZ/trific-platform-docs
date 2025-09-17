# Troubleshooting Common Issues

This guide helps you resolve common issues when setting up and using the TRIFIC Platform. If you don't find your issue here, check our [Support Center](/support/) or contact our support team.

## Installation & Setup Issues

### Platform Won't Start

**Problem**: The platform fails to start or shows connection errors

**Solutions**:

1. **Check System Requirements**

    - Node.js 18.0.0 or higher
    - npm 9.0.0 or higher
    - Modern browser (Chrome 90+, Firefox 88+, Safari 14+)

2. **Verify Environment Configuration**

    ```bash
    # Check your environment variables
    cat .env

    # Ensure required variables are set
    DATABASE_URL=your_database_url
    JWT_SECRET=your_jwt_secret
    API_BASE_URL=your_api_base_url
    ```

3. **Clear Cache and Reinstall**

    ```bash
    # Clear npm cache
    npm cache clean --force

    # Remove node_modules and reinstall
    rm -rf node_modules package-lock.json
    npm install
    ```

### Database Connection Errors

**Problem**: "Database connection failed" or similar database errors

**Solutions**:

1. **Verify Database Configuration**

    - Check database URL format
    - Ensure database server is running
    - Verify credentials and permissions

2. **Test Connection**

    ```bash
    # Test database connectivity
    npm run db:test-connection

    # Run database migrations
    npm run db:migrate
    ```

3. **Check Firewall/Network Settings**
    - Ensure database port is accessible
    - Check VPN/proxy settings
    - Verify SSL/TLS requirements

## Authentication Issues

### Login Problems

**Problem**: Cannot log in or "Invalid credentials" errors

**Solutions**:

1. **Password Reset**

    - Use the "Forgot Password" link
    - Check email (including spam folder)
    - Follow reset instructions carefully

2. **Account Status Check**

    - Verify email address is confirmed
    - Check if account is suspended
    - Contact support for account status

3. **Browser Issues**
    - Clear browser cache and cookies
    - Disable browser extensions
    - Try incognito/private mode

### Two-Factor Authentication (2FA) Issues

**Problem**: 2FA codes not working or device lost

**Solutions**:

1. **Time Synchronization**

    - Ensure device time is correct
    - Sync authenticator app time settings

2. **Backup Codes**

    - Use saved backup codes
    - Generate new backup codes after successful login

3. **Recovery Options**
    - Contact support with identity verification
    - Provide account details and last known activities

## API Integration Issues

### API Authentication Errors

**Problem**: 401 Unauthorized or 403 Forbidden errors

**Solutions**:

1. **Check API Key**

    ```bash
    # Verify API key format
    curl -H "Authorization: Bearer YOUR_API_KEY" \
         https://api.trific.platform/v1/auth/verify
    ```

2. **Verify Permissions**

    - Check API key permissions in dashboard
    - Ensure key has required scopes
    - Regenerate key if necessary

3. **Review Headers**
    ```javascript
    // Correct header format
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
    ```

### Rate Limiting Issues

**Problem**: "Too Many Requests" (429) errors

**Solutions**:

1. **Implement Exponential Backoff**

    ```javascript
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    async function apiCallWithRetry(url, options, maxRetries = 3) {
    	for (let i = 0; i < maxRetries; i++) {
    		try {
    			const response = await fetch(url, options);
    			if (response.status === 429) {
    				const retryAfter =
    					response.headers.get("Retry-After") || Math.pow(2, i);
    				await delay(retryAfter * 1000);
    				continue;
    			}
    			return response;
    		} catch (error) {
    			if (i === maxRetries - 1) throw error;
    		}
    	}
    }
    ```

2. **Check Rate Limits**
    - Review your current usage in dashboard
    - Consider upgrading plan if needed
    - Implement caching to reduce API calls

## Payment & Escrow Issues

### Payment Processing Errors

**Problem**: Payments failing or stuck in processing

**Solutions**:

1. **Verify Payment Method**

    - Check card expiration dates
    - Verify billing address matches
    - Ensure sufficient funds available

2. **Bank/Provider-Specific Issues**

    - Contact your bank about international transactions
    - Check for spending limits or restrictions
    - Verify account is in good standing

3. **Try Alternative Payment Method**
    - Use different card or bank account
    - Consider mobile money options (M-Pesa, etc.)
    - Contact finance team for manual processing

### Escrow Release Issues

**Problem**: Funds not releasing after milestone completion

**Solutions**:

1. **Check Milestone Status**

    - Verify all deliverables are submitted
    - Ensure client has approved the milestone
    - Review any pending feedback requirements

2. **Review Contract Terms**

    - Check automatic release timeframes
    - Verify milestone acceptance criteria
    - Ensure all conditions are met

3. **Contact Support**
    - Provide contract and milestone details
    - Include relevant communication history
    - Request manual review if necessary

## Provider Vetting Issues

### Vetting Status Problems

**Problem**: Vetting taking too long or status unclear

**Solutions**:

1. **Check Document Requirements**

    - Ensure all required documents uploaded
    - Verify document quality and legibility
    - Submit any missing certifications

2. **Follow Up Timeline**

    - Standard vetting: 5-7 business days
    - Complex cases: up to 14 business days
    - Contact support after timeline expires

3. **Common Rejection Reasons**
    - Incomplete documentation
    - Insufficient experience evidence
    - Failed background/credit checks
    - Inadequate portfolio samples

### Document Upload Issues

**Problem**: Cannot upload documents or files rejected

**Solutions**:

1. **File Format Requirements**

    - Supported formats: PDF, JPG, PNG, DOC, DOCX
    - Maximum file size: 10MB per file
    - Ensure files are not password protected

2. **Quality Requirements**

    - Documents must be clearly readable
    - Photos should be well-lit and focused
    - Avoid screenshots of documents when possible

3. **Technical Issues**
    - Clear browser cache
    - Try different browser
    - Ensure stable internet connection

## Portal-Specific Issues

### Client Portal Problems

**Problem**: Cannot find providers or post jobs

**Solutions**:

1. **Search Filters**

    - Clear all filters and search again
    - Try broader category selections
    - Check geographic restrictions

2. **Job Posting Issues**
    - Verify all required fields completed
    - Check budget range is reasonable
    - Ensure job description meets guidelines

### Provider Portal Problems

**Problem**: Not receiving job notifications or applications failing

**Solutions**:

1. **Profile Completeness**

    - Ensure profile is 100% complete
    - Add relevant skills and categories
    - Upload portfolio samples

2. **Notification Settings**

    - Check email notification preferences
    - Verify email address is confirmed
    - Review job alert settings

3. **Application Issues**
    - Ensure proposal meets requirements
    - Check application within deadline
    - Verify all required information provided

## Performance Issues

### Slow Loading Times

**Problem**: Platform is slow or unresponsive

**Solutions**:

1. **Browser Optimization**

    - Clear browser cache and cookies
    - Disable unnecessary extensions
    - Update to latest browser version

2. **Network Issues**

    - Test internet connection speed
    - Try different network/location
    - Check for VPN/proxy interference

3. **Device Performance**
    - Close other applications/tabs
    - Restart browser or device
    - Check available memory/storage

### Mobile Responsiveness

**Problem**: Platform not working properly on mobile

**Solutions**:

1. **Browser Compatibility**

    - Use supported mobile browsers
    - Update browser to latest version
    - Clear mobile browser cache

2. **Display Issues**
    - Check device orientation
    - Try desktop view on mobile
    - Report specific mobile bugs to support

## Getting Additional Help

### Before Contacting Support

1. **Try Basic Troubleshooting**

    - Clear cache and cookies
    - Try different browser
    - Check internet connection

2. **Gather Information**

    - Error messages (screenshot if possible)
    - Browser and version
    - Operating system
    - Steps to reproduce issue

3. **Check System Status**
    - Visit status.trific.platform
    - Check for known outages
    - Review recent updates/changes

### Contact Information

**Priority Support** (for critical issues):

-   Email: urgent@trific.platform
-   Phone: +254-XXX-XXXX-XXX (Business hours)

**General Support**:

-   Email: support@trific.platform
-   Live Chat: Available in platform during business hours
-   Help Center: help.trific.platform

**Response Times**:

-   Critical Issues: Within 2 hours
-   High Priority: Within 8 hours
-   Standard Issues: Within 24 hours
-   General Inquiries: Within 48 hours

### Community Support

-   **User Forum**: community.trific.platform
-   **Developer Discord**: discord.gg/trific-dev
-   **Status Updates**: @TRIFICSPLATFORM on Twitter

---

**Still having issues?** Don't hesitate to reach out to our support team. We're here to help you succeed on the TRIFIC Platform!

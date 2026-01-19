---
sidebar_position: 1
---

# Authentication

Model Health uses email/password authentication with optional two-factor verification.

## Login Flow

### Basic Login

**Swift:**
```swift
let result = try await service.login(
    username: "user@example.com",
    password: "your-password"
)

switch result {
case .success:
    print("Logged in successfully")
case .verificationRequired:
    print("Need to verify with email code")
}
```

**TypeScript:**
```typescript
const result = await service.login("user@example.com", "your-password");

if (result === "success") {
  console.log("Logged in successfully");
} else if (result === "verification_required") {
  console.log("Need to verify with email code");
}
```

### Two-Factor Verification

When verification is required, you'll receive an email with a 6-digit code:

**Swift:**
```swift
try await service.verify(code: "123456", rememberDevice: true)
```

**TypeScript:**
```typescript
await service.verify("123456", true);
```

The `rememberDevice` parameter determines whether future logins from this device will require verification.

## Session Management

After successful authentication, your session token is automatically managed by the SDK. The token is:

- Stored securely in the keychain (Swift) or configured storage (TypeScript)
- Automatically refreshed when needed
- Used for all subsequent API calls

## Error Handling

**Swift:**
```swift
do {
    let result = try await service.login(username: username, password: password)
    // Handle result...
} catch {
    if let authError = error as? AuthenticationError {
        switch authError {
        case .invalidCredentials:
            print("Invalid username or password")
        case .accountLocked:
            print("Account has been locked")
        default:
            print("Authentication failed: \(authError)")
        }
    }
}
```

**TypeScript:**
```typescript
try {
  const result = await service.login(username, password);
  // Handle result...
} catch (error) {
  console.error("Authentication failed:", error);
}
```

## Best Practices

1. **Never hardcode credentials** - Always prompt users for credentials or use secure storage
2. **Remember device carefully** - Only enable "remember device" on trusted devices
3. **Handle errors gracefully** - Provide clear feedback when authentication fails
4. **Secure storage** - In TypeScript, implement custom `TokenStorage` for production apps

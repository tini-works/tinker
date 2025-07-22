# Screen Variations

This document builds upon our previous work on screen mockups by adding variations, states, and navigation connections between screens for the Invoice Approval System.

## Purpose

The purpose of this document is to:
1. Define different states for each screen
2. Show how screens connect and flow into each other
3. Illustrate the complete user journey through the application
4. Document conditional variations based on user roles and system states

## Navigation Map

Below is a high-level navigation map showing how screens connect:

```
                                 ┌─────────────────┐
                                 │                 │
                                 │    Dashboard    │
                                 │                 │
                                 └───────┬─────────┘
                                         │
                 ┌───────────────┬───────┴────────┬───────────────┐
                 │               │                │               │
    ┌────────────▼─────┐ ┌───────▼───────┐ ┌──────▼─────────┐ ┌──▼───────────────┐
    │                  │ │               │ │                │ │                  │
    │  Invoice List    │ │ Payment       │ │ Approval       │ │ User             │
    │                  │ │ Request List  │ │ Dashboard      │ │ Management       │
    │                  │ │               │ │                │ │                  │
    └────────┬─────────┘ └───────┬───────┘ └────────┬───────┘ └──────────────────┘
             │                   │                  │
    ┌────────▼─────────┐ ┌───────▼───────┐ ┌────────▼───────┐
    │                  │ │               │ │                │
    │  Invoice Detail  │ │ PR Detail     │ │ Approval       │
    │                  │ │               │ │ Detail         │
    │                  │ │               │ │                │
    └──────────────────┘ └───────┬───────┘ └────────────────┘
                                 │
                         ┌───────▼───────┐
                         │               │
                         │ PR Creation/  │
                         │ Edit Form     │
                         │               │
                         └───────────────┘
```

## Screen States and Variations

### 1. Dashboard

**Variations:**
- **Default View**: Shows summary metrics for all users
- **Admin View**: Additional administrative controls and system-wide metrics
- **Finance View**: Focus on financial metrics and pending payments
- **Approver View**: Emphasis on pending approvals requiring action

**States:**
- **Loading**: Initial loading state with skeleton UI
- **Empty State**: For new users with no data
- **Error State**: When data cannot be loaded
- **Filtered State**: When filters are applied to dashboard widgets

### 2. Invoice List

**Variations:**
- **All Invoices View**: Default view showing all invoices
- **Pending Invoices**: Invoices not yet linked to Payment Requests
- **Processed Invoices**: Invoices that have been fully processed
- **Obsolete Invoices**: Invoices marked as obsolete

**States:**
- **Loading**: Initial loading state
- **Empty State**: No invoices available
- **Search Results**: After search is performed
- **Filter Applied**: When filters are active
- **Batch Import In Progress**: When batch import is running
- **Import Error**: When import fails

**Transitions:**
- Click on invoice → Invoice Detail
- Click "Import Invoices" → Import Modal
- Click "Create Payment Request" → PR Creation Form (with selected invoices)

### 3. Invoice Detail

**Variations:**
- **Editable**: For invoices not yet linked to a PR
- **Read-only**: For invoices linked to a PR or completed
- **Admin View**: With additional administrative options

**States:**
- **Loading**: Initial loading state
- **Error**: When invoice cannot be loaded
- **Linked to PR**: Shows PR information
- **Unlinked**: Available to be added to a PR
- **Completed**: Invoice has been paid
- **Obsolete**: Invoice marked as obsolete

**Transitions:**
- Click "Back" → Invoice List
- Click "Edit" → Edit Invoice Form
- Click "Add to Payment Request" → PR Selection or Creation
- Click "View Payment Request" → PR Detail (if linked)

### 4. Payment Request List

**Variations:**
- **All PRs View**: Default view showing all payment requests
- **My PRs**: PRs created by or assigned to current user
- **Pending Approval**: PRs awaiting approval
- **Approved PRs**: Fully approved PRs
- **Completed PRs**: PRs marked as paid and completed

**States:**
- **Loading**: Initial loading state
- **Empty State**: No payment requests available
- **Search Results**: After search is performed
- **Filter Applied**: When filters are active

**Transitions:**
- Click on PR → PR Detail
- Click "Create Payment Request" → PR Creation Form

### 5. Payment Request Detail

**Variations:**
- **Creator View**: Full editing capabilities (if in draft)
- **Approver View**: With approval actions
- **Finance View**: With payment marking options
- **Read-only View**: For completed PRs or non-stakeholders

**States:**
- **Draft**: Editable, not yet submitted
- **Submitted**: Awaiting first approval
- **In Review**: In approval process
- **Rejected**: Sent back for changes
- **Approved**: Fully approved, awaiting payment
- **Completed**: Payment made and verified
- **Reverted**: Returned to previous state

**Transitions:**
- Click "Back" → Payment Request List
- Click "Edit" → PR Edit Form (if in draft)
- Click "Submit for Approval" → Confirmation Modal → Approval Process
- Click "Approve" → Approval Confirmation
- Click "Reject" → Rejection Form with Comments
- Click "Mark as Paid" → Payment Confirmation
- Click "View Invoices" → Linked Invoices View
- Click "Add Comment" → Comment Form

### 6. PR Creation/Edit Form

**Variations:**
- **Creation Mode**: Creating new PR
- **Edit Mode**: Editing existing PR
- **Admin Override**: With additional options for admins

**States:**
- **Initial**: Empty form
- **Partially Filled**: Some fields completed
- **Validation Error**: Form with validation errors
- **Ready to Submit**: All required fields filled
- **Submitting**: Processing submission

**Transitions:**
- Click "Cancel" → Return to previous screen
- Click "Save Draft" → Save and stay on form
- Click "Save and Exit" → Save and return to PR List
- Click "Submit" → Validation → Confirmation → PR Detail

### 7. Approval Dashboard

**Variations:**
- **Approver View**: PRs requiring user's approval
- **Creator View**: Status of user's submitted PRs
- **Admin View**: All approval processes

**States:**
- **Loading**: Initial loading state
- **Empty**: No approvals pending
- **Filtered**: Filtered view of approvals

**Transitions:**
- Click on PR → PR Detail with Approval Focus
- Click "Approve" → Quick Approval Flow
- Click "View All" → Filtered PR List

### 8. Approval Detail

**Variations:**
- **Single-stage Approval**: Simple approval process
- **Multi-stage Approval**: Complex approval chain
- **With Delegation**: When approval is delegated

**States:**
- **Current Stage**: Highlighting current approval stage
- **Approved Stages**: Showing completed approvals
- **Pending Stages**: Future approval stages
- **Rejected**: When approval is rejected

**Transitions:**
- Click "Back" → Approval Dashboard
- Click "View PR" → PR Detail
- Click "Approve" → Approval Confirmation
- Click "Reject" → Rejection Form
- Click "Delegate" → Delegation Form

### 9. User Management (Admin Only)

**Variations:**
- **User List**: All system users
- **Role Management**: Assigning roles
- **Approval Chain Setup**: Configuring approval workflows

**States:**
- **Viewing**: Browsing users
- **Editing**: Modifying user details
- **Creating**: Adding new user

**Transitions:**
- Click on User → User Detail/Edit
- Click "Add User" → User Creation Form
- Click "Manage Roles" → Role Assignment
- Click "Configure Approval Chains" → Approval Configuration

## Conditional Logic and Business Rules

### Invoice Status Transitions
```
New → Pending → Linked to PR → Completed
   ↘         ↘
     Obsolete  Rejected
```

### Payment Request Status Transitions
```
Draft → Submitted → In Review → Approved → Completed
          ↓           ↓
        Rejected ← Rejected
```

### Approval Rules
1. **Role-based Approval**: Different roles have different approval capabilities
2. **Sequential Approval**: Some PRs require sequential approval steps
3. **Threshold-based Routing**: PRs above certain amounts require additional approvals
4. **Delegation**: Approvals can be delegated with proper authorization

## Interactive Elements

### Modals and Popups
- **Confirmation Dialogs**: For critical actions
- **Import Progress**: For batch operations
- **Quick View**: For previewing items without full navigation
- **Comments/Notes**: For adding feedback without changing screens

### Notifications
- **System Notifications**: For completed processes
- **User Alerts**: For required actions
- **Error Messages**: For failed operations
- **Success Confirmations**: For completed actions

## Responsive Considerations

### Mobile Adaptations
- **Simplified Navigation**: Condensed menu for mobile
- **Progressive Disclosure**: Show less information initially on small screens
- **Touch-Friendly Controls**: Larger tap targets for mobile users
- **Reduced Data Tables**: Simplified tables for small screens

### Tablet Adaptations
- **Split Views**: Utilize larger screen for master-detail views
- **Enhanced Filters**: More visible filtering options
- **Optimized Forms**: Better use of screen space for forms

## Accessibility Considerations

- **Keyboard Navigation**: All screens navigable via keyboard
- **Screen Reader Support**: Proper ARIA labels and roles
- **Color Contrast**: Sufficient contrast for all text elements
- **Focus Indicators**: Clear visual focus for keyboard users

## Summary

This document outlines the various states, variations, and connections between screens in the Invoice Approval System. By defining these relationships and states, we create a comprehensive map of the user experience throughout the application.

The next steps would be to:
1. Create interactive prototypes based on these variations
2. Validate the flows with stakeholders
3. Refine the transitions and states based on feedback
4. Develop the technical specifications for implementation


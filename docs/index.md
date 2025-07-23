# Project

We'll use this project to think, think deep, think really deep. The outputs are masterpieces because we make, and try, and compact the thinking in multiple steps to get to where we 

# Goal

Create a set of prompts/setups/commands for Claude to be able to analyze any software subject, and be able to prepare the ultimate document setup for implementation (technical details are prohibited)

We will not talk about specific frameworks capability or language limitation.
We DO talk about limitation of user port boudaries, for example, web has it owns limitation, mobile has it owns limitation, desktop application has it owns limitation. Those trade-offs are important in the analysis and reasoning

# Workflow to kickstarted the discoveries

1. Build Eventstorming for the main flow. This Eventstorming plays very important role discovering the state changes of database entities
2. Build and confirm list of user journeys. Verify that with Eventstorming
3. Extract touch points, and build an Information Architecture. With this, we'll know what screens are for, in what states and how to navigate from to.
4. Finalize screen mockups and build most important paths based on [3]. Those screen mockups will need to be quite realistics, clickable and navigatable, to default or specific variant as needed
5. Interactive web app using html and tailwindcss cdn where user can
- Split screen and variations into different HTML files, use css tricks to make screen can support different variantions over copying
- Use iframe to include screen in the main web app
- Can navigate back and forth using IA
- Can navigate by interacting on the prototype
- Can see the reasoning behind materials 1,2,3
- Utilize markdown rendering library via unpacked to render markdown inline without build

# Example of the inputs
Context:
An invoice approval system. 

Every month, invoices are going to be imported in batches (or one by one, automatically or manually) to the system. Those invoices are supposed to be processed, end results will be either, imported or obseleted, those are normally can be imported by any users of the system.

Imported invoices are going to be queued, and to be processed by admin or HR depending on the nature of the invoice. 

HR or admin will start with creating a thing called Payment Request (PR). This PR is the working unit for administration team, they'll work around the PR. Each PR serve a specific purpose, with reasons, proof, working materials (normally comes in excels, pdfs attachments etc), users can leave comments, updates, making approvals or requesting changes.



This is when the Approval process kicks in. The PR goes through the approval process and can be going back and forth.

Once the Payment Request got approved (through one or many stages), the finance will make the payment outside of the system (this doesn't need to be tracked). Once the Finance team reviewed the payments, they'll mark the PR as completed manually. 
- The PR will be sealed and nolonger can be changed (but it can be reverted to previous state)
- All linked Invoices are marked as completed

# Expected outputs

- md documents as artifacts for steps
- working html that can be served using `npx serve -p <port>`, please use this to verify
- a summary document so next time agent start working, they can kickstart analyzing (workflow, where to look at, what to look at, how to look at etc)
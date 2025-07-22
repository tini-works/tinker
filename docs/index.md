# Project

We'll use this project to think, think deep, think really deep. The outputs are masterpieces because we make, and try, and compact the thinking in multiple steps to get to where we 

# Goal

Create a set of prompts/setups/commands for Claude to be able to analyze any software subject, and be able to prepare the ultimate document setup for implementation (technical details are prohibited)

We will not talk about specific frameworks capability or language limitation.
We DO talk about limitation of user port boudaries, for example, web has it owns limitation, mobile has it owns limitation, desktop application has it owns limitation. Those trade-offs are important in the analysis and reasoning

# Workflow to kickstarted the discoveries

1. Build Eventstorming for the main flow. This Eventstorming plays very important role discovering the state changes of database entities
2. Build and confirm list of user journeys. Verify that with Eventstorming
3. Extract touch points, build list of screens, stay at the intention level to verify whether all paths are covered
4. Build screen mockups for screens without variations
5. Based on 1,2,3, make the mockups lively by adding variations (state of screens), connect, and navigate back and forth between screens

# Example of the inputs
Context:
An invoice approval system. Every month, invoices are going to be imported in batches to system. Those invoices are supposed to be processed, end results will be either, processed or obseleted, those are normally can be imported by any users of the system.

Then admin, or HR can create a Payment Request for the approval process. The Payment Request needs to be linked to one or many Invoices. Each Payment Request will have different route of approvals. Those Payment Request takes sometime to collect, comment back and forth till it's ready to be Reviewed.

This is when the Approval process kicks in. The PR goes through the approval process and can be going back and forth.

Once the Payment Request got approved (through one or many stages), the finance will make the payment outside of the system (this doesn't need to be tracked). Once the Finance team reviewed the payments, they'll mark the PR as completed manually. 
- The PR will be sealed and nolonger can be changed (but it can be reverted to previous state)
- All linked Invoices are marked as completed

# Expected outputs

- md documents as artifacts for steps
- working html that can be served using `npx serve -p <port>`, please use this to verify
- a summary document so next time agent start working, they can kickstart analyzing (workflow, where to look at, what to look at, how to look at etc)
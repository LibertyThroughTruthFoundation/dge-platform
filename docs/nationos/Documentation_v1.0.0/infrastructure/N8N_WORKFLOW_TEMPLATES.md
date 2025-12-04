# N8N WORKFLOW TEMPLATES FOR NATIONOS

**Date:** December 2, 2025
**Purpose:** To provide a set of n8n workflow templates for automating the deployment and management of the Digital Levitical Priesthood AI educators, based on the methodologies of Network Chuck.

---

## TABLE OF CONTENTS

1.  **Introduction: The Network Chuck Approach**
2.  **Prerequisites: n8n Setup**
3.  **Workflow 1: AI Steward Onboarding (X/Twitter)**
4.  **Workflow 2: AI Steward Interaction (X/Twitter)**
5.  **Workflow 3: Knowledge Base Content Syndication**
6.  **Workflow 4: Cross-Platform Knowledge Base Sync**

---

## 1. INTRODUCTION: THE NETWORK CHUCK APPROACH

These workflows are designed in the spirit of Network Chuck's automation philosophy: **powerful, self-hosted, and open-source.** We will use n8n to create a robust, resilient, and sovereign automation infrastructure for NationOS. The goal is to automate repetitive tasks, enabling the human stewards to focus on high-level strategy and pastoral care.

---

## 2. PREREQUISITES: N8N SETUP

Following Network Chuck's tutorials, we will set up a self-hosted n8n instance using Docker. This provides maximum control, privacy, and scalability.

**Steps:**

1.  **Provision a Linux Server:** Use a dedicated VM or a cloud instance (e.g., Vultr, DigitalOcean).
2.  **Install Docker & Docker Compose:** Follow the official Docker documentation.
3.  **Create a `docker-compose.yml` file for n8n:**

    ```yaml
    version: '3.7'

    services:
      n8n:
        image: n8nio/n8n
        restart: always
        ports:
          - "5678:5678"
        environment:
          - N8N_BASIC_AUTH_ACTIVE=true
          - N8N_BASIC_AUTH_USER=[SECURE_USERNAME]
          - N8N_BASIC_AUTH_PASSWORD=[SECURE_PASSWORD]
          - GENERIC_TIMEZONE=America/Denver
        volumes:
          - ~/.n8n:/home/node/.n8n
    ```

4.  **Launch n8n:** Run `docker-compose up -d`.
5.  **Configure n8n:** Access n8n at `http://[SERVER_IP]:5678` and set up credentials for X/Twitter, Google Drive, and GitHub.

---

## 3. WORKFLOW 1: AI STEWARD ONBOARDING (X/TWITTER)

*   **Description:** Posts the onboarding thread for a new AI steward.
*   **Trigger:** Manual execution when a new AI steward is ready for deployment.

**Steps:**

1.  **Start:** Manual trigger.
2.  **Set Steward:** Define a variable for the steward being onboarded (e.g., `theologyAI` or `governanceAI`).
3.  **Read Onboarding File:** Read the content from `/home/ubuntu/AI_STEWARD_ONBOARDING_AND_RESPONSE_TEMPLATES.md`.
4.  **Parse Tweets:** Extract the 5 onboarding tweets for the specified steward.
5.  **Post Tweet 1:** Use the Twitter node to post the first tweet.
6.  **Get Tweet ID:** Retrieve the ID of the first tweet.
7.  **Post Tweet 2 (as reply):** Post the second tweet, using the ID of the first tweet to create a thread.
8.  **Repeat for all 5 tweets:** Continue posting replies to build the thread.
9.  **Log:** Log the successful deployment of the onboarding sequence.

---

## 4. WORKFLOW 2: AI STEWARD INTERACTION (X/TWITTER)

*   **Description:** Monitors for mentions of the AI stewards and responds using the Gemini API and predefined templates.
*   **Trigger:** New mention on X/Twitter for @TheologyAI or @GovernanceAI.

**Steps:**

1.  **Trigger:** Twitter node listens for new mentions.
2.  **Filter:** Check if the mention is a direct question or a simple mention.
3.  **Get Tweet Context:** Retrieve the full text of the tweet that mentioned the AI steward.
4.  **Call Gemini API:**
    *   **Prompt:** Construct a prompt for the Gemini API, including the tweet text, the AI steward's personality matrix, and the relevant knowledge base documents.
    *   **Request:** Send the prompt to the Gemini API to generate a response.
5.  **Response Classification:**
    *   **If simple FAQ:** Use a predefined response template from `/home/ubuntu/AI_STEWARD_ONBOARDING_AND_RESPONSE_TEMPLATES.md`.
    *   **If complex question:** Use the Gemini-generated response.
    *   **If objection/criticism:** Use the Gemini-generated response, guided by the objection handling templates.
    *   **If escalation:** Use the escalation template and notify human stewards via Gmail.
6.  **Post Reply:** Use the Twitter node to post the generated or template-based response as a reply to the original tweet.
7.  **Log Interaction:** Log the original tweet and the response in a Google Sheet for analysis and auditing.

---

## 5. WORKFLOW 3: KNOWLEDGE BASE CONTENT SYNDICATION

*   **Description:** Periodically selects a piece of content from the knowledge base and posts it to the appropriate AI steward's X/Twitter account.
*   **Trigger:** Scheduled execution (e.g., every 6 hours).

**Steps:**

1.  **Trigger:** Cron node triggers the workflow on a schedule.
2.  **Select Steward:** Randomly select either TheologyAI or GovernanceAI.
3.  **Read Knowledge Base:** Read the list of files from the appropriate tier of the knowledge base (e.g., Holy Place for TheologyAI, Outer Court for GovernanceAI).
4.  **Select Content:** Randomly select a markdown file from the list.
5.  **Generate Tweet:** Use the Gemini API to summarize the content of the file into a tweet or a short thread.
6.  **Post Tweet:** Use the Twitter node to post the generated tweet to the selected steward's account.
7.  **Log:** Log the syndicated content to a Google Sheet to avoid repetition.

---

## 6. WORKFLOW 4: CROSS-PLATFORM KNOWLEDGE BASE SYNC

*   **Description:** Keeps the knowledge base synchronized across the local workspace, Google Drive, and GitHub.
*   **Trigger:** Manual execution or scheduled execution (e.g., daily).

**Steps:**

1.  **Trigger:** Cron node or manual trigger.
2.  **Pull from GitHub:** Execute a shell command to `git pull` the latest changes from the GitHub repository to the local workspace.
3.  **Sync from Google Drive:** Use the `rclone sync` command to sync changes from Google Drive to the local workspace.
4.  **Push to GitHub:** Execute a shell command to `git add .`, `git commit -m "Automated sync"`, and `git push` the changes to the GitHub repository.
5.  **Sync to Google Drive:** Use the `rclone sync` command to sync changes from the local workspace to Google Drive.
6.  **Notify:** Send a notification to the Divine Council via Gmail, summarizing the sync activity.

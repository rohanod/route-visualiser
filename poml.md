### Quick Start: Clone and Install POML

Source: https://github.com/microsoft/poml/blob/main/docs/contributing.md

This snippet clones the POML repository, navigates into the directory, and installs dependencies and builds the webview and CLI components using npm. It's the initial setup for getting the project running.

```bash
git clone https://github.com/microsoft/poml
cd poml
npm ci
npm run build-webview
npm run build-cli
```

--------------------------------

### Environment Setup Commands (Bash)

Source: https://github.com/microsoft/poml/blob/main/AGENTS.md

Commands to install dependencies and build the project's webview and CLI components. Requires Node.js and Python to be installed.

```bash
npm ci
npm run build-webview
npm run build-cli
python -m pip install -e .[dev]
```

--------------------------------

### POML TypeScript Quick Start Example

Source: https://github.com/microsoft/poml/blob/main/docs/typescript/index.md

A quick start example demonstrating how to use the POML TypeScript API to create a prompt with text and an image, parse it into an intermediate representation (IR), and then render it to markdown.

```tsx
import { Paragraph, Image } from 'poml/essentials';
import { read, write } from 'poml';
const prompt = (
  <Paragraph>
    Hello, world! Here is an image:
    <Image src='photo.jpg' alt='A beautiful scenery' />
  </Paragraph>
);

// Parse the prompt components into an intermediate representation (IR)
const ir = await read(prompt);

// Render it to different formats
const markdown = write(ir);
```

--------------------------------

### XML Example Set Structure

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

Demonstrates the basic XML structure for an example set using the '<examples>' tag with chat context enabled. Each '<example>' contains an '<input>' and '<output>' element.

```xml
<examples chat="{true}">
  <example>
    <input>What is the capital of France?</input>
    <output>Paris</output>
  </example>
  <example>
    <input>What is the capital of Germany?</input>
    <output>Berlin</output>
  </example>
</examples>
```

--------------------------------

### POML Few-Shot Example Structure

Source: https://github.com/microsoft/poml/blob/main/docs/python/integration/langchain.md

Illustrates the POML XML structure for defining few-shot examples. It uses tags like <task>, <example>, <example-input>, <example-output>, and <human-msg> to organize the prompt and examples.

```xml
<poml>
  <task>Solve these math problems:</task>

  <example for="ex in examples">
    <example-input>{{ ex.input }}</example-input>
    <example-output>{{ ex.output }}</example-output>
  </example>

  <human-msg>{{ input }}</human-msg>
</poml>
```

--------------------------------

### XML Example Usage for Input/Output Pairs

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

Demonstrates how to use XML tags to define example input and output pairs. This is useful for providing context or demonstrating expected results for a given task. The structure includes a root 'example' tag containing 'input' and 'output' child elements.

```xml
<example>
  <input>What is the capital of France?</input>
  <output>Paris</output>
</example>
```

--------------------------------

### Install POML, OpenAI, and Pydantic SDKs

Source: https://github.com/microsoft/poml/blob/main/docs/tutorial/expense_part1.md

This command installs the necessary Python packages for the project: POML for workflow orchestration, OpenAI for LLM interactions, and Pydantic for data validation. Ensure you have Python 3.9+ installed.

```bash
pip install poml openai pydantic
```

--------------------------------

### LangChain FewShotPromptTemplate Example

Source: https://github.com/microsoft/poml/blob/main/docs/python/integration/langchain.md

Demonstrates creating a few-shot prompt using LangChain's FewShotPromptTemplate. It requires defining example data, a template for each example, and the overall prompt structure including prefix, suffix, and input variables.

```python
from langchain.prompts import FewShotPromptTemplate, PromptTemplate

examples = [
    {"input": "2+2", "output": "4"},
    {"input": "3*3", "output": "9"}
]

example_prompt = PromptTemplate(
    input_variables=["input", "output"],
    template="Input: {input}\nOutput: {output}"
)

few_shot_prompt = FewShotPromptTemplate(
    examples=examples,
    example_prompt=example_prompt,
    prefix="Solve these math problems:",
    suffix="Input: {input}\nOutput:",
    input_variables=["input"]
)
```

--------------------------------

### Testing Instructions (Bash)

Source: https://github.com/microsoft/poml/blob/main/AGENTS.md

Commands to build and test the project after making changes. Includes linting, unit tests, and Python integration tests.

```bash
npm run build-webview
npm run build-cli
npm run lint
npm test
python -m pytest python/tests
```

--------------------------------

### POML Structured Template Example

Source: https://github.com/microsoft/poml/blob/main/docs/python/integration/langchain.md

Presents an example of a POML template demonstrating its structured syntax, including system messages, human messages, and conditional inclusion of examples using an `if` attribute.

```xml
<poml>
  <system-msg>You are {{ person }}, answer in their unique style and personality.</system-msg>
  <human-msg>{{ question }}</human-msg>
  <div if="include_examples">
    <examples>
      <document src="{{ person }}_examples.txt" />
    </examples>
  </div>
</poml>
```

--------------------------------

### StepwiseInstructions Usage Example in XML

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

This XML snippet demonstrates how to structure a list of steps for the StepwiseInstructions component. Each item in the list represents a single instruction.

```xml
<stepwise-instructions>
  <list>
    <item>Interpret and rewrite user's query.</item>
    <item>Think of a plan to solve the query.</item>
    <item>Generate a response based on the plan.</item>
  </list>
</stepwise-instructions>
```

--------------------------------

### Install POML with AgentOps Support

Source: https://github.com/microsoft/poml/blob/main/docs/python/integration/agentops.md

Installs the POML library with built-in support for AgentOps integration. This command ensures all necessary dependencies for AgentOps tracing are included.

```bash
pip install poml[agent]
```

--------------------------------

### Install MCP Library

Source: https://github.com/microsoft/poml/blob/main/docs/python/integration/mcp.md

Installs the MCP library using pip. This is the first step to enable MCP functionalities in your project.

```bash
pip install mcp
```

--------------------------------

### POML Output Element Usage

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

Shows how to use the POML `<output>` element to represent example responses, both as static text and with dynamic placeholders for templated content.

```xml
<output>The capital of France is Paris.</output>
```

```xml
<output>The capital of {{country}} is {{capital}}.</output>
```

--------------------------------

### VS Code Extension Testing (Bash)

Source: https://github.com/microsoft/poml/blob/main/AGENTS.md

Specific commands to compile and run tests for the VS Code extension, often requiring xvfb-run for headless execution.

```bash
xvfb-run -a npm run compile && xvfb-run -a npm run test-vscode
```

--------------------------------

### Install POML.js via npm

Source: https://github.com/microsoft/poml/blob/main/README.md

This command installs the POML.js package, which provides the Software Development Kit (SDK) for Node.js, enabling integration of POML into JavaScript and TypeScript applications.

```bash
npm install pomljs
```

--------------------------------

### POML VS Code Google Gemini Configuration

Source: https://github.com/microsoft/poml/blob/main/docs/vscode/configuration.md

This JSON configuration example illustrates how to set up POML in VS Code for Google Gemini, specifying the provider, model name, and API key.

```json
{
  "poml.languageModel.provider": "google",
  "poml.languageModel.model": "gemini-1.5-pro",
  "poml.languageModel.apiKey": "your-google-api-key"
}
```

--------------------------------

### XML Example for Task Summarization with Captions

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

Illustrates an XML structure for defining a summarization task example, including captions for input and output. This format helps clarify the source passage and its corresponding summary, especially when dealing with longer texts.

```xml
<task>Summarize the following passage in a single sentence.</task>
<example>
  <input caption="Passage">The sun provides energy for life on Earth through processes like photosynthesis.</input>
  <output caption="Summary">The sun is essential for energy and life processes on Earth.</output>
</example>
```

--------------------------------

### Install Weave Separately

Source: https://github.com/microsoft/poml/blob/main/docs/python/integration/weave.md

Installs the Weave library independently. This is useful if you are already using POML and only need to add Weave support for tracing and observability.

```bash
pip install weave
```

--------------------------------

### Basic POML Structure Example

Source: https://github.com/microsoft/poml/blob/main/README.md

This XML snippet demonstrates the basic structure of a POML file, defining a role, task, an image reference, and output format specifications for an LLM prompt. It is intended to be placed in a .poml file.

```xml
<poml>
  <role>You are a patient teacher explaining concepts to a 10-year-old.</role>
  <task>Explain the concept of photosynthesis using the provided image as a reference.</task>

  <img src="photosynthesis_diagram.png" alt="Diagram of photosynthesis" />

  <output-format>
    Keep the explanation simple, engaging, and under 100 words.
    Start with "Hey there, future scientist!".
  </output-format>
</poml>
```

--------------------------------

### Install AgentOps Separately

Source: https://github.com/microsoft/poml/blob/main/docs/python/integration/agentops.md

Installs the AgentOps library independently. This is an alternative to installing POML with the agent extra, useful if AgentOps is needed for other purposes.

```bash
pip install agentops
```

--------------------------------

### Install POML TypeScript API via npm

Source: https://github.com/microsoft/poml/blob/main/docs/typescript/index.md

Installs the POML TypeScript API package using npm. Two versions are available: the stable release and a nightly build for the latest features.

```bash
npm install pomljs
```

```bash
npm install pomljs@nightly
```

--------------------------------

### POML Text Component with 'text' Syntax (XML)

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

Illustrates the usage of the 'text' component with the 'text' syntax in POML. This example shows how to wrap the entire prompt content, including a custom list.

```xml
<poml syntax="text">
Contents of the whole prompt.

1. Your customized list.
2. You don't need to know anything about POML.
</poml>
```

--------------------------------

### Development Install for Python

Source: https://github.com/microsoft/poml/blob/main/docs/contributing.md

Installs the Python package in editable mode with development dependencies like pytest, black, and isort. This is crucial for Python-specific development and testing within the POML project.

```bash
python -m pip install -e .[dev]
```

--------------------------------

### POML Text Component with 'markdown' Syntax and Speaker (XML)

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

Shows how to render a POML prompt in markdown syntax with a specified 'human' speaker. This example includes a simple question-answer structure.

```xml
<poml syntax="markdown" speaker="human">
  <p>You are a helpful assistant.</p>
  <p>What is the capital of France?</p>
</poml>
```

--------------------------------

### JavaScript Alert Example

Source: https://github.com/microsoft/poml/blob/main/packages/poml/tests/assets/sampleWebpage.html

A basic JavaScript snippet demonstrating the use of the alert function to display a message to the user. This is a common client-side scripting technique for user notifications.

```javascript
// This is a comment in JavaScript
alert("Hello, world!");
```

--------------------------------

### Install Langchain and Langchain-OpenAI

Source: https://github.com/microsoft/poml/blob/main/docs/python/integration/langchain.md

Installs the necessary Python packages for using LangChain with OpenAI models. This is a prerequisite for integrating POML with LangChain.

```bash
pip install langchain langchain-openai
```

--------------------------------

### Install MLflow Separately

Source: https://github.com/microsoft/poml/blob/main/docs/python/integration/mlflow.md

Installs MLflow and its generative AI components independently. This is an alternative to installing POML with MLflow support if MLflow is already managed or needs to be installed separately.

```bash
pip install mlflow mlflow-genai
```

--------------------------------

### Jinja2/f-string Template Example in LangChain

Source: https://github.com/microsoft/poml/blob/main/docs/python/integration/langchain.md

Illustrates a basic prompt template using Jinja2 syntax within LangChain's PromptTemplate. This serves as a comparison to POML's more structured approach.

```python
from langchain.prompts import PromptTemplate

prompt_template = PromptTemplate.from_template(
    "Answer the question as if you are {person}, fully embodying their style, "
    "wit, personality, and habits of speech. The question is: {question}"
)
```

--------------------------------

### Basic POML Usage with AgentOps Tracing

Source: https://github.com/microsoft/poml/blob/main/docs/python/integration/agentops.md

Demonstrates how to initialize AgentOps, enable POML tracing, and use POML for generating LLM prompts. AgentOps automatically starts tracing upon initialization and stops at script termination.

```python
import os
import poml
import agentops
from openai import OpenAI

# Initialize AgentOps. Trace is automatically started.
agentops.init()

# Enable POML tracing with AgentOps
poml.set_trace("agentops", trace_dir="pomlruns")

# Use POML as usual
client = OpenAI()
messages = poml.poml(
    "explain_code.poml",
    context={"code_path": "sample.py"},
    format="openai_chat"
)

response = client.chat.completions.create(
    model="gpt-5",
    **messages
)

# Trace ends automatically at the end of the script.
```

--------------------------------

### POML XML Runtime Parameters Configuration

Source: https://github.com/microsoft/poml/blob/main/docs/language/meta.md

Illustrates how to configure runtime parameters for language models in POML using XML attributes. This example sets temperature, max-output-tokens, model, and top-p. POML automatically handles key and value conversions for these parameters.

```xml
<runtime temperature="0.7"
         max-output-tokens="1000"
         model="gpt-5"
         top-p="0.9" />
```

--------------------------------

### XML Task Element Example

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

Demonstrates the basic usage of the XML task element for a single instruction. This is a simple directive for the language model.

```xml
<task>Cook a recipe on how to prepare a beef dish.</task>
```

--------------------------------

### Notification Usage in Content Scripts - TypeScript

Source: https://github.com/microsoft/poml/blob/main/packages/poml-browser/common/notification-usage.md

Demonstrates how to use the notification system within content scripts to report information or errors related to the current web page. This example shows extracting page content and notifying about its length and title, or reporting if no content is found.

```typescript
import { notify, notifyInfo } from '../functions/notification';

// Extract page content
const content = document.body.innerText;
notifyInfo('Page content extracted', {
  length: content.length,
  title: document.title,
});

// Report errors
if (!content) {
  notify('error', 'No content found on this page');
}
```

--------------------------------

### Install Python Package in Development Mode (Bash)

Source: https://github.com/microsoft/poml/blob/main/CLAUDE.md

Command to install the Python package for POML in editable mode, allowing for direct development and testing without reinstallation.

```bash
pip install -e .
```

--------------------------------

### Notification Usage in React Components - TypeScript

Source: https://github.com/microsoft/poml/blob/main/packages/poml-browser/common/notification-usage.md

Illustrates how to integrate the notification system within React components to provide user feedback on asynchronous operations. This example shows dispatching success and error notifications based on the outcome of data fetching.

```typescript
import { notifySuccess, notifyError } from '../../functions/notification';

const MyComponent = () => {
  const handleClick = async () => {
    try {
      const result = await fetchData();
      notifySuccess('Data loaded', result);
    } catch (error) {
      notifyError('Failed to load data', error);
    }
  };

  return <button onClick={handleClick}>Load Data</button>;
};
```

--------------------------------

### POML Example with Variables and Schema

Source: https://github.com/microsoft/poml/blob/main/docs/vscode/features.md

This snippet demonstrates a basic POML structure defining variables for an array and its count, displaying them in a paragraph, and generating a Zod schema based on these variables. It showcases variable declaration, array manipulation, template expressions, and schema generation within the POML framework.

```xml
<poml>
  <let name="items" value='["apple", "banana", "cherry"]' />
  <let name="count" value="items.length" />

  <p>We have {{ count }} items: {{ items.join(', ') }}</p>

  <output-schema parser="eval">
    z.object({
      total: z.number().max(count),
      items: z.array(z.enum(items))
    })
  </output-schema>
</poml>
```

--------------------------------

### POML VS Code Azure OpenAI Configuration

Source: https://github.com/microsoft/poml/blob/main/docs/vscode/configuration.md

This JSON configuration example demonstrates how to set up POML in VS Code for Azure OpenAI, specifying the provider, model deployment name, API key, API URL, and API version.

```json
{
  "poml.languageModel.provider": "microsoft",
  "poml.languageModel.model": "my-gpt4-deployment",
  "poml.languageModel.apiKey": "your-azure-api-key",
  "poml.languageModel.apiUrl": "https://your-resource.openai.azure.com/openai",
  "poml.languageModel.apiVersion": "2024-02-15-preview"
}
```

--------------------------------

### Notification Usage in Background Service Worker - TypeScript

Source: https://github.com/microsoft/poml/blob/main/packages/poml-browser/common/notification-usage.md

Shows how to leverage the notification system from a background service worker to provide feedback on background tasks, such as data processing. This example handles incoming messages, processes data, and sends success or error notifications.

```typescript
import { notifySuccess, notifyError } from '../functions/notification';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'processData') {
    try {
      const result = processData(request.data);
      notifySuccess('Data processed', result);
      sendResponse({ success: true, result });
    } catch (error) {
      notifyError('Processing failed', error);
      sendResponse({ success: false, error: error.message });
    }
  }
});
```

--------------------------------

### Configure MLflow Tracking Server

Source: https://github.com/microsoft/poml/blob/main/docs/python/integration/mlflow.md

Provides commands to set up an MLflow tracking server. It includes options for starting a local server or configuring a remote tracking server using an environment variable.

```bash
# Start a local MLflow tracking server
mlflow server --host 0.0.0.0 --port 5000

# Or use a remote tracking server
export MLFLOW_TRACKING_URI="http://your-mlflow-server:5000"
```

--------------------------------

### XML Task Element with List Example

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

Illustrates how to use the XML task element to define a list of steps for a more complex instruction. The `<list>` and `<item>` tags are used to structure the steps.

```xml
<task>
  Planning a schedule for a travel.
  <list>
    <item>Decide on the destination and plan the duration.</item>
    <item>Find useful information about the destination.</item>
    <item>Write down the schedule for each day.</item>
  </list>
</task>
```

--------------------------------

### XML List Component Usage Example

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

Demonstrates the usage of the `<list>` component in POML with a 'decimal' list style, containing two list items. This shows how to structure ordered lists using the provided markup.

```xml
<list listStyle="decimal">
  <item>Item 1</item>
  <item>Item 2</item>
</list>
```

--------------------------------

### Run Specific Test Files (Bash)

Source: https://github.com/microsoft/poml/blob/main/CLAUDE.md

Example command to run a specific test file using Jest, allowing for targeted testing of components or modules within the POML project.

```bash
npx jest packages/poml/tests/components.test.ts
```

--------------------------------

### POML VS Code Anthropic Claude Configuration

Source: https://github.com/microsoft/poml/blob/main/docs/vscode/configuration.md

This JSON configuration example shows how to set up POML in VS Code for Anthropic Claude, including the provider, model name, and API key.

```json
{
  "poml.languageModel.provider": "anthropic",
  "poml.languageModel.model": "claude-3-5-sonnet-20241022",
  "poml.languageModel.apiKey": "your-anthropic-api-key"
}
```

--------------------------------

### POML Structured Output Usage with OpenAI SDK

Source: https://github.com/microsoft/poml/blob/main/docs/python/integration/openai.md

Example Python code showing how to generate POML parameters for structured output and then use them with the OpenAI SDK, including parsing the JSON result.

```python
import json
import poml
from openai import OpenAI

client = OpenAI()

params = poml.poml("response_format.poml", format="openai_chat")
# params will include "response_format" for structured output

response = client.chat.completions.create(model="gpt-4.1", **params)
result = json.loads(response.choices[0].message.content)
print(result)
# Output: {'name': 'Science Fair', 'date': 'Friday', 'participants': ['Alice', 'Bob']}
```

--------------------------------

### Example MLflow Trace Data in JSON

Source: https://github.com/microsoft/poml/blob/main/docs/python/integration/mlflow.md

Illustrates the structure of the data captured and logged by POML when MLflow integration is enabled. This JSON object shows the inputs, including the prompt and context, and the outputs received from the LLM.

```json
{
  "inputs": {
    "prompt": "<poml> <task>You are a senior Python developer. Please explain the code.</task> <code inline=\"false\"> <document src=\"{{ code_path }}\" parser=\"txt\" /> </code> <runtime temperature=\"0.7\" max-tokens=\"256"/> </poml>",
    "context": {
      "code_path": "sample.py"
    },
    "stylesheet": null
  },
  "outputs": {
    "messages": [
      {
        "speaker": "human",
        "content": "# Task\n\nYou are a senior Python developer. Please explain the code.\n\n```\ndef greet(name):\n    print(f\"Hello, {name}!\")\n..."
      }
    ]
  }
}
```

--------------------------------

### Generate Component Specifications (Bash)

Source: https://github.com/microsoft/poml/blob/main/AGENTS.md

Command to generate or update component specifications, typically used after modifying type annotations or documentation.

```bash
npm run generate-component-spec
```

--------------------------------

### Python: Complete MCP and POML Integration Example

Source: https://github.com/microsoft/poml/blob/main/docs/python/integration/mcp.md

This Python script demonstrates a complete integration of MCP and POML. It initializes the context, connects to an MCP server, and runs the conversation loop using `run_mcp_conversation`. Key dependencies include `json`, `asyncio`, `openai`, `poml`, and `mcp`.

```python
import json
import asyncio
from openai import OpenAI
import poml
from mcp import ClientSession
from mcp.client.sse import sse_client

async def main():
    # Initialize context for POML
    context = {
        "system": "You are a helpful DM assistant. Use the dice-rolling tool when needed.",
        "input": "Roll 2d4+1",
        "tools": [],
        "interactions": []
    }

    # Connect to MCP server (using public demo server)
    server_url = "https://dmcp-server.deno.dev/sse"

    async with sse_client(server_url) as (read, write):
        async with ClientSession(read, write) as mcp_session:
            await mcp_session.initialize()
            result = await run_mcp_conversation(mcp_session, context)
            print(f"Conversation completed: {result}")

if __name__ == "__main__":
    asyncio.run(main())
```

--------------------------------

### Execute Travel Expense Agent Python Script

Source: https://github.com/microsoft/poml/blob/main/docs/tutorial/expense_part1.md

This command executes the main Python script for the travel expense agent example. It processes sample documents through the complete workflow, demonstrating structured outputs and final email generation. No external dependencies beyond standard Python are explicitly mentioned for this execution step.

```bash
python 404_travel_expense_agent.py
```

--------------------------------

### Formulate a Question with XML

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

Represents a question combined with a prompt for the answer, typically placed at the end of a model prompt. This usage example shows how to ask a question within an XML tag.

```xml
<qa>What is the capital of France?</qa>
```

--------------------------------

### POML PDF Analysis Example in LangChain

Source: https://github.com/microsoft/poml/blob/main/docs/python/integration/langchain.md

Illustrates POML's simplified approach to PDF analysis within LangChain. The POML template directly references the PDF, and LangChain handles the processing, abstracting away manual file reading.

```xml
<poml>
  <task>Analyze this document and answer the question.</task>
  <document src="{{ pdf_path }}" />
  <human-msg>{{ question }}</human-msg>
</poml>
```

--------------------------------

### Markdown with Embedded POML Elements

Source: https://github.com/microsoft/poml/blob/main/docs/deep-dive/proposals/poml_extended.md

This example demonstrates how POML elements like <task> and <examples> can be embedded directly within a Markdown document. It shows the flexibility of the extended POML format for integrating structured markup into text-based content.

```markdown
# My Analysis Document

This is a regular markdown document that explains the task.

<task>
  Analyze the following data and provide insights.
</task>

Here are some key points to consider:

- Data quality
- Statistical significance
- Business impact

<examples>
  <example>
    <input>Sample data point 1</input>
    <output>Analysis result 1</output>
  </example>
</examples>

## Conclusion

The analysis shows...

```

--------------------------------

### POML Stylesheet with ClassName Selector

Source: https://github.com/microsoft/poml/blob/main/docs/language/meta.md

Illustrates styling specific elements using the `className` attribute and CSS-like selectors in the POML `<stylesheet>`. This example targets a table with class 'csv' and sets its 'syntax' and 'writerOptions'.

```xml
<poml>
  <table className="csv" records="[[1,2,3],[4,5,6]]"/>
  <stylesheet>
    {
      ".csv": {
        "syntax": "csv",
        "writerOptions": "{\"csvSeparator\": \";\", \"csvHeader\": false}"
      }
    }
  </stylesheet>
</poml>
```

--------------------------------

### Jinja2/f-string PDF Analysis Example in LangChain

Source: https://github.com/microsoft/poml/blob/main/docs/python/integration/langchain.md

Demonstrates a manual approach to analyzing PDF content within a LangChain prompt using Jinja2. It involves reading the PDF with PyPDF2 and then passing the extracted text to the prompt.

```python
import PyPDF2
from langchain.prompts import PromptTemplate

def read_pdf(file_path):
    with open(file_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
    return text

pdf_content = read_pdf("document.pdf")
prompt = PromptTemplate.from_template(
    "Analyze this document:\n{pdf_text}\n\nQuestion: {question}"
)
# Assuming 'chain' is defined elsewhere
# result = chain.invoke({"pdf_text": pdf_content, "question": "What are the key points?"})
```

--------------------------------

### XML ListItem with blankLine Attribute Example

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

Illustrates the `<list>` and `<item>` components, specifically highlighting the use of the `blankLine` attribute on a `<item>` element. This attribute controls the spacing around the list item.

```xml
<list listStyle="decimal">
  <item blankLine="true">Item 1</item>
  <item>Item 2</item>
</list>
```

--------------------------------

### Basic Notification Usage - TypeScript

Source: https://github.com/microsoft/poml/blob/main/packages/poml-browser/common/notification-usage.md

Demonstrates the fundamental usage of the notification system to display various types of alerts like success, error, warning, info, and debug messages. It also shows how to include additional data or error objects with notifications and customize their behavior using options.

```typescript
import { notify, notifySuccess, notifyError, notifyWarning, notifyInfo, notifyDebug } from '../functions/notification';

// Simple notifications
notifySuccess('Operation completed successfully');
notifyError('Failed to load data');
notifyWarning('This action cannot be undone');
notifyInfo('Processing your request...');
notifyDebug('Debug info for developers');

// With additional data
const userData = { id: 123, name: 'John', email: 'john@example.com' };
notifySuccess('User created', userData);

// With error objects
try {
  await someAsyncOperation();
} catch (error) {
  notifyError('Operation failed', error);
}

// With options
notifyError('Critical error', errorDetails, {
  title: 'System Error',
  duration: 0, // Persistent notification
  position: 'top',
  autoHide: false,
});
```

--------------------------------

### XML Paragraph Usage Example

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

Demonstrates the basic usage of the Paragraph element in XML. It shows how to enclose content within the `<p>` tags to define a paragraph block. This element is primarily used for text content and is typically surrounded by blank lines in markup.

```xml
<p>Contents of the paragraph.</p>
```

--------------------------------

### XML Newline Component Usage Example

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

Shows the basic usage of the `<br />` component in POML, which is used to explicitly insert a line break within markup content. This tag is ignored in serializer syntaxes.

```xml
<br />
```

--------------------------------

### Create Node.js SDK and Browser Extension Packages (Bash)

Source: https://github.com/microsoft/poml/blob/main/CLAUDE.md

Commands to create distributable packages for the Node.js SDK and the browser extension. This involves compiling and bundling for each respective platform.

```bash
cd packages/poml-build && npm pack
cd packages/poml-browser && npm run zip
```

--------------------------------

### XML Strikethrough Usage Example

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

Illustrates how to use the Strikethrough element in XML. The `<s>` or `<strike>` tags are used to indicate text that has been removed or is considered invalid. This is useful for showing edits or deprecated information.

```xml
<s>This messages is removed.</s>
```

--------------------------------

### Build CLI and Webview Components

Source: https://github.com/microsoft/poml/blob/main/docs/contributing.md

Commands to build the CLI executable, which is used in the Python SDK, and the webview components for the POML project.

```bash
npm run build-cli
npm run build-webview
```

--------------------------------

### Define Output Format with XML

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

Specifies the desired format for the model's output. This example uses XML to request a JSON response without any extra characters or punctuation. It influences how the model structures its generated content.

```xml
<output-format>Respond with a JSON without additional characters or punctuations.</output-format>
```

--------------------------------

### Error Handling Helpers - TypeScript

Source: https://github.com/microsoft/poml/blob/main/packages/poml-browser/common/notification-usage.md

Presents utility functions for simplifying error handling in both asynchronous and synchronous operations. `withErrorHandling` wraps async functions to catch and report errors, while `withSyncErrorHandling` does the same for synchronous functions.

```typescript
import { withErrorHandling, withSyncErrorHandling } from '../functions/notification';

// Async operations with automatic error handling
const result = await withErrorHandling(
  async () => {
    const response = await fetch('/api/data');
    return response.json();
  },
  'Failed to fetch data', // Error message
  'Data loaded successfully', // Success message (optional)
);

// Sync operations with automatic error handling
const parsed = withSyncErrorHandling(() => JSON.parse(jsonString), 'Invalid JSON format');
```

--------------------------------

### Display Tool Response using XML

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

This example demonstrates how to display the results of a tool execution using the `<ToolResponse>` XML tag. It includes child elements like `<Paragraph>` and `<List>` with `<ListItem>` to structure the rich content of the response. The `id`, `name`, and `syntax` attributes are used to identify and render the response.

```xml
<ToolResponse id="123" name="search">
 <Paragraph>Search results for "hello":</Paragraph>
 <List>
  <ListItem>Result 1</ListItem>
  <ListItem>Result 2</ListItem>
 </List>
</ToolResponse>
```

--------------------------------

### POML Whitespace Control Example

Source: https://github.com/microsoft/poml/blob/main/docs/language/white-space.md

Demonstrates the usage of the 'whiteSpace' attribute ('pre', 'filter', 'trim') on POML components to control whitespace rendering. The 'pre' option preserves all whitespace, 'filter' normalizes it, and 'trim' removes leading/trailing whitespace.

```xml
<poml>
  <!-- Preserve exact formatting with 'pre' -->
  <p whiteSpace="pre" syntax="markdown">This text    has multiple
  spaces and
      indentation preserved.


      You can also include endless new lines.</p>

  <!-- Normalize whitespace with 'filter' -->
  <p whiteSpace="filter">This text    will have
  normalized    spacing.

  New lines will also be reduced to a space.
  </p>

  <!-- Trim whitespace with 'trim' -->
  <p whiteSpace="trim">   This text will have leading    and trailing spaces removed.   </p>
</poml>
```

--------------------------------

### Build Documentation and Specs (Bash)

Source: https://github.com/microsoft/poml/blob/main/CLAUDE.md

Commands for generating project documentation and specification files, such as component documentation in JSON and Markdown formats, and a .vscodeignore file.

```bash
npm run generate-component-spec
npm run generate-vscodeignore
```

--------------------------------

### POML VS Code API URL Setting (Single)

Source: https://github.com/microsoft/poml/blob/main/docs/vscode/configuration.md

This JSON snippet sets a single API URL for POML in VS Code, applicable to all providers. Examples include the default OpenAI URL and custom OpenAI-compatible endpoints.

```json
{
  "poml.languageModel.apiUrl": "https://api.openai.com/v1/"
}
```

--------------------------------

### JavaScript Expression Schema with Context Variables in POML

Source: https://github.com/microsoft/poml/blob/main/docs/language/meta.md

Illustrates defining an output schema using a JavaScript expression with 'parser="eval"'. This example dynamically creates an object schema based on a context variable 'fields', mapping each field name to a Zod string type.

```xml
<let name="fields" value='["name", "email", "age"]' />
<output-schema parser="eval">
  z.object(
    Object.fromEntries(fields.map(f => [f, z.string()]))
  )
</output-schema>
```

--------------------------------

### Render Block Code Snippet

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

Renders a code snippet as a distinct block, suitable for longer code examples. The `lang` parameter specifies the programming language for syntax highlighting. The `inline` parameter defaults to `false` for block-level code.

```xml
<code lang="javascript">
const x = 42;
</code>
```

--------------------------------

### XML Usage of Introducer Component

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

Demonstrates the basic XML structure for using the 'introducer' component. The 'introducer' tag is used to provide context before a block of content, with its content serving as the introductory text.

```xml
<introducer>Here are some examples.</introducer>
```

--------------------------------

### Wrap Content in System Message using XML

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

This example shows how to wrap content within a system message using the `<system-msg>` XML tag. It allows specifying parameters like `syntax`, `className`, `speaker`, `name`, `type`, `writerOptions`, `whiteSpace`, `charLimit`, `tokenLimit`, and `priority` to control the message's rendering and processing.

```xml
<system-msg>Answer concisely.</system-msg>
```

--------------------------------

### Build All Packages (Bash)

Source: https://github.com/microsoft/poml/blob/main/CLAUDE.md

Commands to compile TypeScript to JavaScript and build various production-ready packages for the POML project, including the VS Code extension, webview components, and CLI tool.

```bash
npm run compile
npm run build-extension
npm run build-webview
npm run build-cli
```

--------------------------------

### Tool Schema with Template Expressions in POML

Source: https://github.com/microsoft/poml/blob/main/docs/language/meta.md

Shows how to use template expressions within a tool definition's schema. This example uses 'parser="json"' and injects a 'maxValue' variable to dynamically set the maximum allowed value for a 'value' property in the tool's schema.

```xml
<let name="maxValue" value="1000" />
<tool-definition name="calculator" description="Calculate values" parser="json">
  {
    "type": "object",
    "properties": {
      "value": {
        "type": "number",
        "maximum": {{ maxValue }}
      }
    }
  }
</tool-definition>
```

--------------------------------

### Development and Production Build Commands for POML Browser Extension

Source: https://github.com/microsoft/poml/blob/main/packages/poml-browser/CLAUDE.md

This snippet lists essential npm commands for building and testing the POML browser extension. It covers development builds, watch mode, production builds, packaging, and testing with Vitest and Playwright. It also notes that developers should not run these commands themselves but ask the developer to do so.

```bash
# Development builds
npm run build:dev          # Build for development
npm run watch              # Watch mode for development

# Production builds
npm run build:prod         # Build for production
npm run zip                # Alias for package

# Testing
npm run build:test         # Build for testing
npm run test:vitest        # Run unit tests with Vitest
npm run test:playwright    # Run browser extension tests with Playwright
```

--------------------------------

### XML with Mixed POML and Text Content

Source: https://github.com/microsoft/poml/blob/main/docs/deep-dive/proposals/poml_extended.md

This example illustrates the extended POML format's capability to handle mixed content within XML. It shows how <text> tags can enclose pure text, including Markdown and variables, while other POML tags are processed as markup. It also demonstrates nesting and the placement of POML elements outside a main <poml> wrapper.

```xml
<poml>
  <task>Process the following data</task>
  <text>
    This is **markdown** content that will be processed as pure text.

    - Item 1
    - Item 2

    {{ VARIABLES_WILL_ALSO_SHOWN_AS_IS }}
    <cp caption="Nested POML">This is a nested POML component that will be processed as POML.</cp>

    No POML processing happens here.
  </text>
  <hint>Remember to check the format</hint>
</poml>

There can be some intervening text here as well.

<poml>
  <p>You can add another POML segment here: {{variable_will_be_substituted}}</p>
</poml>

<p>POML elements do not necessarily reside in a <text><poml> (the <poml> here is processed as is.)</text> element.</p>

```

--------------------------------

### XML Example Usage of Italic Tag

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

Shows the usage of the `<i>` tag in XML to italicize text. This tag is used for emphasizing text with an italic style. Similar to the `<span>` tag, it accepts parameters such as syntax, className, speaker, writerOptions, whiteSpace, charLimit, tokenLimit, and priority.

```xml
Your <i>italicized</i> text.
```

--------------------------------

### XML Example Usage of Inline Span

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

Demonstrates how to use an inline `<span>` tag within an XML `<p>` element. The `<span>` tag is used to wrap specific text content for inline styling or processing. It accepts parameters like syntax, className, speaker, writerOptions, whiteSpace, charLimit, tokenLimit, and priority.

```xml
<p>I'm listening to <span>music</span> right now.</p>
```

--------------------------------

### Reader Interface Definition in TypeScript

Source: https://github.com/microsoft/poml/blob/main/docs/deep-dive/proposals/poml_extended.md

Defines the contract for reader components in POML, specifying methods for reading segments, getting hover tokens, and retrieving completions. This interface ensures consistent behavior across different reader types.

```typescript
interface Reader {
  read(segment: Segment, context: PomlContext?): React.ReactElement;
  getHoverToken(segment: Segment, offset: number): PomlToken | undefined;
  getCompletions(offset: number): PomlToken[];
}
```

--------------------------------

### Register JavaScript Expression Tool Definition in POML

Source: https://github.com/microsoft/poml/blob/main/docs/language/meta.md

Registers a tool using a JavaScript expression evaluated with 'parser="eval"'. This example uses Zod to define a schema for a calculation tool, specifying the operation type and numerical operands. The 'z' variable is automatically available.

```xml
<tool-definition name="calculate" description="Perform calculation" parser="eval">
  z.object({
    operation: z.enum(['add', 'subtract', 'multiply', 'divide']),
    a: z.number(),
    b: z.number()
  })
</tool-definition>
```

--------------------------------

### Complex Object Handling with Notifications - TypeScript

Source: https://github.com/microsoft/poml/blob/main/packages/poml-browser/common/notification-usage.md

Demonstrates the notification system's capability to serialize and display complex JavaScript objects, including those with circular references, functions, regular expressions, dates, and errors. The system automatically truncates large objects.

```typescript
const complexData = {
  user: { id: 1, name: 'John' },
  timestamp: new Date(),
  pattern: /test/gi,
  callback: () => console.log('test'),
  error: new Error('Sample error'),
};

notifyDebug('Complex data', complexData);
// Objects are automatically serialized with proper formatting
```

--------------------------------

### Basic POML Usage with Tracing and OpenAI API

Source: https://github.com/microsoft/poml/blob/main/docs/python/trace.md

This Python code illustrates basic POML usage, integrating with the OpenAI API while tracing prompt execution. It first enables tracing, then initializes an OpenAI client. It processes a 'calculator.poml' file with provided context, formats the output for the OpenAI chat API, and sends the request. The trace output is stored in the 'pomlruns' directory.

```python
import poml
from openai import OpenAI

poml.set_trace(trace_dir="pomlruns")
client = OpenAI()

# Every POML call is now automatically traced
params = poml.poml("calculator.poml",
                   context={"question": "What is 15% of 200?"},
                   format="openai_chat")
response = client.chat.completions.create(model="gpt-4", **params)
```

--------------------------------

### Module Import Aliases in POML Browser Extension TypeScript Configuration

Source: https://github.com/microsoft/poml/blob/main/packages/poml-browser/CLAUDE.md

This code demonstrates how to use TypeScript path aliases for cleaner module imports within the POML browser extension. It shows examples of importing from common utilities, UI components, background services, and content script helpers, as defined in the tsconfig.json file.

```typescript
// Module aliases defined in tsconfig.json
import { something } from '@common/*'; // Common utilities
import { component } from '@ui/*'; // UI components
import { service } from '@background/*'; // Background services
import { helper } from '@contentScript/*'; // Content script helpers
```

--------------------------------

### Customize Truncation Behavior in POML

Source: https://github.com/microsoft/poml/blob/main/docs/language/token.md

Explains how to customize truncation behavior using writerOptions in POML when content exceeds character or token limits. Options include defining the truncation marker, direction (end, start, middle), and the token encoding model for accurate counting.

```xml
<p charLimit="20" writerOptions='{ "truncateMarker": " [...] ", "truncateDirection": "middle"}'>This is a very long paragraph that will be truncated if it exceeds the character limit. The truncation will add a marker to indicate that content was cut off.</p>
```

--------------------------------

### Create VSIX Package for VS Code Extension (Bash)

Source: https://github.com/microsoft/poml/blob/main/CLAUDE.md

Commands to package the VS Code extension for distribution, including creating a standard VSIX package and a Windows-specific version.

```bash
npm run package
npm run package:win
```

--------------------------------

### Build Individual Packages (Bash)

Source: https://github.com/microsoft/poml/blob/main/CLAUDE.md

Commands to build individual packages within the POML project, specifically the Node.js SDK and the browser extension using Rollup.

```bash
cd packages/poml-build && npm run build
cd packages/poml-browser && npm run build
```

--------------------------------

### Basic OpenAI Chat Completion with POML

Source: https://github.com/microsoft/poml/blob/main/docs/python/integration/openai.md

Demonstrates how to load a POML file and use its generated parameters directly with the OpenAI Python SDK for chat completions. Requires the 'openai' and 'poml' libraries.

```python
import poml
from openai import OpenAI

client = OpenAI()

# Load POML and get OpenAI-compatible parameters
params = poml.poml("prompt.poml", format="openai_chat")

# Use directly with OpenAI SDK
response = client.chat.completions.create(**params)
```

--------------------------------

### Build VSCode Extension

Source: https://github.com/microsoft/poml/blob/main/docs/contributing.md

Commands to build the VSCode extension for development, enable watch mode for continuous building during development, and create a distributable .vsix package.

```bash
npm run build-extension-dev
npm run watch-extension
npm run package
```

--------------------------------

### Enable POML Tracing in Python

Source: https://github.com/microsoft/poml/blob/main/docs/python/trace.md

This Python snippet demonstrates how to enable POML tracing for all subsequent POML calls. It requires the 'poml' library and specifies a directory to store trace data. No specific input or output files are generated by this command alone, but it configures the tracing mechanism.

```python
import poml

# Start tracing all POML calls
poml.set_trace(trace_dir="pomlruns")
```

--------------------------------

### POML Input Element Usage

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

Demonstrates the basic usage of the POML `<input>` element for static text and for dynamic content using mustache-style templating.

```xml
<input>What is the capital of France?</input>
```

```xml
<input>What is the capital of {{country}}?</input>
```

--------------------------------

### Python: Expense Compliance Check with POML

Source: https://github.com/microsoft/poml/blob/main/docs/tutorial/expense_part1.md

This Python code snippet demonstrates how to perform expense compliance checks using the POML library. It defines Pydantic models for compliance results, prepares context for the POML prompt, generates a POML prompt for compliance checking, and parses the LLM's response into a structured object. It relies on external libraries like Pydantic and assumes the availability of a `client` object for LLM interactions and `poml` for prompt generation.

```python
class RuleCheck(BaseModel):
    ... # omitted for brevity

class ComplianceCheck(BaseModel):
    totals_by_category: List[TotalByCategory]
    overall_total_usd: float
    rule_checks: List[RuleCheck]
    decision: Literal["approve", "needs_fixes", "reject"]

context = {
    "trip_context": relevant_rules.trip_context.model_dump(),
    "extracted_documents": [doc.model_dump() for doc in documents],
    "relevant_rules": relevant_rules.model_dump(),
    "compliance_output_schema": to_strict_json_schema(ComplianceCheck),
}

compliance_prompt = poml.poml(
    "expense_check_compliance.poml",
    context,
    format="openai_chat"
)

compliance_response = client.chat.completions.create(**compliance_prompt, model="gpt-5")
compliance_check = ComplianceCheck.model_validate_json(compliance_response.choices[0].message.content)
```

--------------------------------

### Generate Blog Post using POML

Source: https://github.com/microsoft/poml/blob/main/examples/expects/301_generate_poml.txt

Creates a blog post based on detailed specifications for output format, content structure, style, and inclusion of specific elements. This function uses POML tags to define instructions for the AI.

```jsx
function blog_post() {
  return <poml>
  <task className="instruction">Create a blog post with these specifications:</task>
  
  <output-format className="instruction">
  <list listStyle="decimal">
    <item>Title: [SEO-friendly title]</item>
    <item>Introduction (100 words)
    <list>
      <item>Hook statement</item>
      <item>Context setting</item>
      <item>Main points preview</item>
    </list>
    </item>
    <item>Main body (800 words)
    <list>
      <item>3-4 main points</item>
      <item>Each point: [subtitle + 200 words]</item>
      <item>Include real examples</item>
      <item>Add actionable tips</item>
    </list>
    </item>
    <item>Conclusion (100 words)
    <list>
      <item>Summary of key points</item>
      <item>Call to action</item>
    </list>
    </item>
  </list>
  </output-format>
  
  <cp className="instruction" caption="Style" captionSerialized="style">
  <list>
    <item>Tone: Professional but conversational</item>
    <item>Level: Intermediate audience</item>
    <item>Voice: Active, engaging</item>
    <item>Format: Scannable, with subheadings</item>
  </list>
  </cp>
  
  <cp className="instruction" caption="Include" captionSerialized="include">
  <list>
    <item>Practical examples</item>
    <item>Statistics or research</item>
    <item>Actionable takeaways</item>
    <item>Relevant analogies</item>
  </list>
  </cp>
  </poml>;
}
```

--------------------------------

### Basic POML Meta Element Usage

Source: https://github.com/microsoft/poml/blob/main/docs/language/meta.md

Demonstrates the basic structure of a POML document using the `<meta>` element to specify the minimum required version. Meta elements control document behavior and configuration.

```xml
<poml>
  <meta minVersion="1.0.0" />
  <p>Your content here</p>
</poml>
```

--------------------------------

### Python: Automated Email Generation with POML Tool Calls

Source: https://github.com/microsoft/poml/blob/main/docs/tutorial/expense_part1.md

This Python code illustrates generating automated email responses based on compliance check results using POML. It sets up the context with trip details and compliance outcomes, generates a POML prompt for email generation, and then processes the LLM's response, specifically handling tool calls to send the email. It assumes the availability of a `client` for LLM calls, `poml` for prompt rendering, and a `send_email` function to dispatch the email.

```python
context = {
    "trip_context": relevant_rules.trip_context.model_dump(),
    "compliance_result": compliance_check.model_dump(),
}

email_prompt = poml.poml(
    "expense_send_email.poml",
    context,
    format="openai_chat"
)

# The POML rendering automatically includes tool definitions
email_response = client.chat.completions.create(
    **email_prompt,
    model="gpt-5",
)

# Handle the tool call
tool_call = email_response.choices[0].message.tool_calls[0]
email_args = json.loads(tool_call.function.arguments)
send_email(**email_args)  # Your email implementation
```

--------------------------------

### POML Version Control with Meta Element

Source: https://github.com/microsoft/poml/blob/main/docs/language/meta.md

Illustrates how to define version requirements for POML documents using `minVersion` and `maxVersion` attributes within the `<meta>` element. This ensures compatibility and prevents runtime errors.

```xml
<meta minVersion="0.5.0" maxVersion="2.0.0" />
```

--------------------------------

### Render POML with Context for OpenAI API

Source: https://github.com/microsoft/poml/blob/main/docs/tutorial/expense_part1.md

The poml.poml() function renders a POML file with provided context, preparing it for OpenAI's API. It handles reading PDF/image files and formatting them into the prompt. It also embeds a Pydantic schema as a response format, centralizing prompt components for easier debugging and maintenance.

```python
from pydantic import BaseModel
from typing import List

# Assuming poml and client are imported and configured

class Document(BaseModel):
    # ... document model definition ...
    pass

# Placeholder for the actual poml call
# This snippet illustrates the concept, not a runnable example without full context
# poml.poml("path/to/your/poml_file.poml", context, format="openai_chat")

print("Illustrative example of poml.poml() usage for rendering prompts.")

```

--------------------------------

### Python: Direct MCP Usage - Manual Message and Tool Formatting

Source: https://github.com/microsoft/poml/blob/main/docs/python/integration/mcp.md

This Python snippet illustrates the manual approach to message management and tool formatting when using MCP directly, without POML. It shows how to append messages with specific roles (`assistant`, `tool`) and manually format tool results and convert MCP tools to OpenAI format. This approach requires more boilerplate code compared to POML.

```python
# Manually manage message roles and format
messages.append({"role": "assistant", "content": msg.content or "", "tool_calls": msg.tool_calls})
messages.append({"role": "tool", "tool_call_id": tc.id, "name": fn.name, "content": text_result})

# Manually format tool results from MCP
if result.structuredContent is not None:
    text_result = json.dumps(result.structuredContent)
else:
    text_result = "\n".join([c.text for c in result.content if isinstance(c, types.TextContent)])

# Convert MCP tools to OpenAI format
oa_tools.append({
    "type": "function",
    "function": {"name": t.name, "description": t.description, "parameters": t.inputSchema}
})
```

--------------------------------

### Import POML Python SDK

Source: https://github.com/microsoft/poml/blob/main/docs/tutorial/expense_part1.md

This Python code imports the core POML library, which is essential for building and managing AI workflows. POML facilitates the integration of LLMs and structured data processing.

```python
import poml
```

--------------------------------

### Run VSCode Extension Tests

Source: https://github.com/microsoft/poml/blob/main/docs/contributing.md

Command to run the tests specifically for the VSCode extension part of the POML project.

```bash
npm run test-vscode
```

--------------------------------

### POML XML Tool Definition with Template Expressions

Source: https://github.com/microsoft/poml/blob/main/docs/language/meta.md

Demonstrates defining a tool in POML using template expressions for attributes like name, description, and parser. Variables are declared using '<let>' tags and then referenced using '{{variableName}}'.

```xml
<let name="toolName">calculate</let>
<let name="toolDesc">Perform mathematical calculations</let>
<let name="schemaParser">json</let>

<tool-definition name="{{toolName}}" description="{{toolDesc}}" parser="{{schemaParser}}">
  {
    "type": "object",
    "properties": {
      "operation": { "type": "string" }
    }
  }
</tool-definition>
```

--------------------------------

### Development Builds and Watch Mode (Bash)

Source: https://github.com/microsoft/poml/blob/main/CLAUDE.md

Commands for development builds and enabling watch mode for continuous compilation and updates, particularly for the VS Code extension and TypeScript files.

```bash
npm run build-extension-dev
npm run watch-extension
npm run watch
```

--------------------------------

### Run Python Tests

Source: https://github.com/microsoft/poml/blob/main/docs/contributing.md

Executes the Python test suite using pytest. The `-v` flag provides verbose output.

```bash
pytest -v python/tests
```

--------------------------------

### Extract Relevant Policy Rules with POML

Source: https://github.com/microsoft/poml/blob/main/docs/tutorial/expense_part1.md

This Python code demonstrates Step 2 of using POML for expense report analysis. It defines Pydantic models for context and rules, prepares a context dictionary including extracted documents and an output schema, and then uses poml.poml() to generate a prompt for rule extraction. The response is parsed using Pydantic for validation.

```python
from pydantic import BaseModel
from typing import List

# Assuming poml, client, and to_strict_json_schema are imported

class TripContext(BaseModel):
    pass # omitted for brevity

class Rule(BaseModel):
    pass # omitted for brevity

class RelevantRules(BaseModel):
    trip_context: TripContext
    rules: List[Rule]

employee_email = """
Hi, I just got back from a business trip to New York. Attached are my expense reports.
Please let me know if you need any more information.
"""

# Assume 'documents' is a list of Pydantic Document objects from Step 1
documents = [] # Placeholder for actual documents

context = {
    "email_text": employee_email,
    "extracted_documents": [doc.model_dump() for doc in documents],  # Results from step 1
    "rules_output_schema": to_strict_json_schema(RelevantRules),
}

# This is a conceptual representation. Actual poml.poml call would be here.
rules_prompt = poml.poml(
    "expense_extract_rules.poml",
    context,
    format="openai_chat"
)

# rules_response = client.chat.completions.create(**rules_prompt, model="gpt-5")
# relevant_rules = RelevantRules.model_validate_json(rules_response.choices[0].message.content)

print("Conceptual code for extracting relevant policy rules using POML.")

```

--------------------------------

### Run Python Tests (Bash)

Source: https://github.com/microsoft/poml/blob/main/CLAUDE.md

Command to execute the Python tests for the POML project using pytest, ensuring the Python SDK functions correctly.

```bash
pytest python/tests
```

--------------------------------

### Complete POML VS Code Configuration

Source: https://github.com/microsoft/poml/blob/main/docs/vscode/configuration.md

This JSON configuration sets up comprehensive language model parameters for POML in VS Code, including provider, model, API key, and other settings. It allows for fine-tuning the language model's behavior for POML testing features.

```json
{
  "poml.languageModel.provider": "openai",
  "poml.languageModel.model": "gpt-4o",
  "poml.languageModel.apiKey": "sk-your-api-key-here",
  "poml.languageModel.apiUrl": "https://api.openai.com/v1/",
  "poml.languageModel.temperature": 0.7,
  "poml.languageModel.maxTokens": 1500,
  "poml.scrollPreviewWithEditor": true,
  "poml.markEditorSelection": true,
  "poml.trace": "off"
}
```

--------------------------------

### POML Tool Calls Definition for OpenAI

Source: https://github.com/microsoft/poml/blob/main/docs/python/integration/openai.md

Illustrates how to define tools within a POML file using `<tool-definition>` for OpenAI's function calling feature. Includes handling tool requests and responses.

```xml
<poml>
  <p>What is my horoscope? I am an Aquarius.</p>

  <tool-definition name="get_horoscope" description="Get today's horoscope for an astrological sign.">
  {
      "type": "object",
      "properties": {
          "sign": {
              "type": "string",
              "description": "An astrological sign like Taurus or Aquarius"
          }
      },
      "required": ["sign"]
  }
  </tool-definition>

  <!-- Handle tool interactions with context -->
  <tool-request if="tool_request" id="{{ tool_request.id }}" name="{{ tool_request.name }}" parameters="{{ tool_request.parameters }}" />
  <tool-response if="tool_response" id="{{ tool_response.id }}" name="{{ tool_response.name }}">
    <object data="{{ tool_response.result }}"/>
  </tool-response>
</poml>
```

--------------------------------

### POML Text Component with Experimental Limits and Priority (XML)

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

Demonstrates the experimental usage of token limits and priority settings within the POML 'text' component. This allows for content truncation control based on priority.

```xml
<poml syntax="markdown" tokenLimit="10">
  <p priority="1">This has lower priority and may be truncated first.</p>
  <p priority="3">This has higher priority and will be preserved longer.</p>
</poml>
```

--------------------------------

### Run Node.js/TypeScript Tests

Source: https://github.com/microsoft/poml/blob/main/docs/contributing.md

Executes the full test suite for Node.js and TypeScript components. It also shows how to run a specific test file using npx jest.

```bash
npm run test
npx jest /path/to/specific/testfile.test.ts
```

--------------------------------

### POML Tool Call Implementation with OpenAI SDK

Source: https://github.com/microsoft/poml/blob/main/docs/python/integration/openai.md

Provides a Python implementation for handling OpenAI tool calls initiated by POML. It covers the initial request, processing tool calls, executing functions, and sending back the response.

```python
import json
import poml
from openai import OpenAI

# Assume get_horoscope function is defined elsewhere
def get_horoscope(sign):
    return f"Your horoscope for {sign} is...";

client = OpenAI()

# Initial request
context = {
    "tool_request": None,
    "tool_response": None,
}

params = poml.poml("tool_call.poml", context=context, format="openai_chat")
response = client.chat.completions.create(model="gpt-4.1", **params)

# Process tool call
tool_call = response.choices[0].message.tool_calls[0]
context["tool_request"] = {
    "name": tool_call.function.name,
    "parameters": json.loads(tool_call.function.arguments),
    "id": tool_call.id,
}

# Execute the function
result = {"horoscope": get_horoscope(**context["tool_request"]["parameters"])}

# Send tool response back
context["tool_response"] = {
    "name": tool_call.function.name,
    "result": result,
    "id": tool_call.id,
}

params = poml.poml("tool_call.poml", context=context, format="openai_chat")
response = client.chat.completions.create(model="gpt-4.1", **params)
print(response.choices[0].message.content)
```

--------------------------------

### POML Template for Dynamic MCP Tools

Source: https://github.com/microsoft/poml/blob/main/docs/python/integration/mcp.md

A POML XML template designed for dynamic tool loading from MCP servers. It iterates through discovered tools, defines their schemas, and handles interaction history, including tool requests and responses.

```xml
<poml>
  <system-msg>{{ system }}</system-msg>
  <human-msg>{{ input }}</human-msg>

  <!-- Dynamic Tool Loading: Iterates through tools discovered from the MCP server -->
  <div for="tool in tools">
    <!-- Each tool's name, description, and JSON schema are inserted dynamically -->
    <tool-definition name="{{ tool.name }}" description="{{ tool.description }}">
      {{ tool.schema }}
    </tool-definition>
  </div>

  <!-- Interaction History: Maintains conversation history with tool calls and responses -->
  <div for="i in interactions">
    <!-- All dynamic content is provided through the context parameter -->
    <tool-request for="res in i" id="{{ res.id }}" name="{{ res.name }}" parameters="{{ res.input }}" />
    <tool-response for="res in i" id="{{ res.id }}" name="{{ res.name }}">
      <!-- Embeds the tool output directly via POML's Object componenet. -->
      <object data="{{ res.output }}"/>
    </tool-response>
  </div>

  <runtime model="gpt-4.1"/>
</poml>
```

--------------------------------

### Load and Use POML Template in LangChain

Source: https://github.com/microsoft/poml/blob/main/docs/python/integration/langchain.md

Demonstrates how to load a POML template either from a file or a string and then use it within a LangChain chain. It initializes an LLM and an output parser to construct the chain.

```python
from poml.integration.langchain import LangchainPomlTemplate
from langchain_openai import ChatOpenAI
from langchain_core.output_parsers import StrOutputParser

# Load POML template from file
prompt_template = LangchainPomlTemplate.from_file("explain_code.poml")

# Or create from string
prompt_template = LangchainPomlTemplate.from_template(
    "<poml><task>Explain this:</task>"
    "<code inline=\"false\"><document src=\"{{ code_file }}\" parser=\"txt\" /></code></poml>"
)

# Use in a LangChain chain
llm = ChatOpenAI(model="gpt-4.1")
chain = prompt_template | llm | StrOutputParser()

result = chain.invoke({"code_file": "test_sample.py"})
```

--------------------------------

### POML Standalone File Basic Structure

Source: https://github.com/microsoft/poml/blob/main/docs/language/basic.md

This snippet demonstrates the fundamental structure of a POML file using the standalone mode. It shows how to wrap content within the top-level `<poml>` tag, which is essential for POML to parse and render the markup correctly. This is the recommended approach for creating reusable POML templates.

```xml
<poml>
  <p>Hello, world!</p>
</poml>
```

--------------------------------

### Enable POML Tracing in Python

Source: https://github.com/microsoft/poml/blob/main/docs/tutorial/expense_part2.md

This snippet demonstrates how to enable tracing for all POML calls in a Python script. By setting the trace directory, you create a comprehensive audit trail of every interaction with the LLM, capturing the exact state of prompts before they are sent.

```python
import poml

# Enable tracing for all POML calls
poml.set_trace(trace_dir="pomlruns")
```

--------------------------------

### POML VS Code Language Model Provider Setting

Source: https://github.com/microsoft/poml/blob/main/docs/vscode/configuration.md

This JSON snippet configures the language model provider for POML in VS Code. Options include 'vscode', 'openai', 'openaiResponse', 'microsoft', 'anthropic', and 'google'. If GitHub Copilot is enabled, setting it to 'vscode' utilizes the VS Code's Language Model API, ignoring API URL and Key settings.

```json
{
  "poml.languageModel.provider": "openai"
}
```

--------------------------------

### Enable POML Tracing with Weave in Python

Source: https://github.com/microsoft/poml/blob/main/docs/python/integration/weave.md

Demonstrates how to enable POML tracing with Weave in a Python application. It initializes a Weave project, sets up POML tracing, and then uses POML to generate messages for an OpenAI client.

```python
import poml
import weave
from openai import OpenAI

# Initialize Weave project
weave.init("my_poml_project")

# Enable POML tracing with Weave
poml.set_trace("weave", trace_dir="pomlruns")

# Use POML as usual
client = OpenAI()
messages = poml.poml(
    "explain_code.poml",
    context={"code_path": "sample.py"},
    format="openai_chat"
)

response = client.chat.completions.create(
    model="gpt-5",
    **messages
)
```

--------------------------------

### Run All Tests (Bash)

Source: https://github.com/microsoft/poml/blob/main/CLAUDE.md

Command to execute all Jest tests for the POML project, ensuring the integrity and functionality of the codebase. This includes tests for the VS Code extension.

```bash
npm test
npm run test-vscode
```

--------------------------------

### POML Stylesheet for Element Styling

Source: https://github.com/microsoft/poml/blob/main/docs/language/meta.md

Demonstrates how to apply styles to POML elements using the `<stylesheet>` component. Styles are defined as a JSON object within the tag, allowing customization of element attributes like 'syntax'.

```xml
<poml>
  <stylesheet>
    {
      "p": {
        "syntax": "json"
      }
    }
  </stylesheet>
  <p>This text will be rendered as JSON.</p>
</poml>
```

--------------------------------

### Enable POML Tracing with MLflow in Python

Source: https://github.com/microsoft/poml/blob/main/docs/python/integration/mlflow.md

Demonstrates how to enable POML tracing with MLflow in a Python script. It covers setting up the MLflow experiment, configuring the tracking URI, enabling POML tracing, and autologging OpenAI API calls.

```python
import mlflow
import mlflow.openai
import poml
from openai import OpenAI

# Set up MLflow experiment
mlflow.set_experiment("poml_integration")
mlflow.set_tracking_uri("http://localhost:5000")

# Enable POML tracing with MLflow
poml.set_trace("mlflow", trace_dir="pomlruns")

# Enable OpenAI autologging for tracing OpenAI API calls as well
mlflow.openai.autolog()

# Use POML as usual
client = OpenAI()
messages = poml.poml(
    "explain_code.poml",
    context={"code_path": "sample.py"},
    format="openai_chat"
)

response = client.chat.completions.create(
    model="gpt-5",
    **messages
)
```

--------------------------------

### Lint Code (Bash)

Source: https://github.com/microsoft/poml/blob/main/CLAUDE.md

Command to run ESLint on the packages directory of the POML project for code quality and style consistency.

```bash
npm run lint
```

--------------------------------

### Underline Component Usage (XML)

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

Illustrates the basic usage of the 'underline' component in POML to draw a line beneath text within markup syntaxes.

```xml
This text is <u>underlined</u>.
```

--------------------------------

### Configure Editor Selection Highlighting

Source: https://github.com/microsoft/poml/blob/main/docs/vscode/configuration.md

Configures how the editor selection is highlighted in the POML preview and enables double-click navigation between the editor and preview. The default value is true.

```json
{
  "poml.markEditorSelection": true,
  "poml.doubleClickToSwitchToEditor": true
}
```

--------------------------------

### Display Table from Excel File (XML)

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

Imports and displays data from an Excel file. Specifies the source file, parser, maximum records, and output syntax. 'src' points to the file, 'parser' defines how to read it, and 'syntax' sets the output format.

```xml
<table src="data.xlsx" parser="excel" maxRecords="10" syntax="csv" />
```

--------------------------------

### POML Structured Output with OpenAI

Source: https://github.com/microsoft/poml/blob/main/docs/python/integration/openai.md

Demonstrates using the `<output-schema>` tag in POML to leverage OpenAI's structured output feature. The generated parameters include the `response_format` for schema validation.

```xml
<poml>
  <system-msg>Extract the event information.</system-msg>
  <human-msg>Alice and Bob are going to a science fair on Friday.</human-msg>
  <output-schema>
  z.object({
    name: z.string(),
    date: z.string(),
    participants: z.array(z.string()),
  });
  </output-schema>
</poml>
```

--------------------------------

### POML Text Component Usages (XML)

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

Demonstrates the basic structure and nesting of headers within the 'text' component in POML. It shows how to define main and sub-section titles.

```xml
<h>Section Title</h>
<section>
  <h>Sub-section Title</h>  <!-- Nested header -->
  <p>Sub-section details</p>
</section>
```

--------------------------------

### Format and Lint Files

Source: https://github.com/microsoft/poml/blob/main/docs/contributing.md

Commands to format all files using Prettier and perform ESLint checks. Includes options to format without fixing and check formatting.

```bash
npm run format
npm run format:check
npm run lint
```

--------------------------------

### Create Research Plan using POML

Source: https://github.com/microsoft/poml/blob/main/examples/expects/301_generate_poml.txt

Transforms potential project options into a structured research plan. It outlines key objectives, research methods, evaluation criteria, and expected outcomes, focusing on clear, practical steps.

```jsx
function research() {
  return <poml>
  <task>You are given various potential options or approaches for a project. Convert these into a well-structured research plan.</task>
  
  <stepwise-instructions>
  <list listStyle="decimal">
  <item>Identifies Key Objectives
    <list listStyle="dash">
      <item>Clarify what questions each option aims to answer</item>
      <item>Detail the data/info needed for evaluation</item>
    </list>
  </item>
  <item>Describes Research Methods
    <list listStyle="dash">
      <item>Outline how you’ll gather and analyze data</item>
      <item>Mention tools or methodologies for each approach</item>
    </list>
  </item>
  
  <item>Provides Evaluation Criteria
    <list listStyle="dash">
      <item>Metrics, benchmarks, or qualitative factors to compare options  </item>
      <item>Criteria for success or viability</item>
    </list>
  </item>
  
  <item>Specifies Expected Outcomes
    <list listStyle="dash">
      <item>Possible findings or results  </item>
      <item>Next steps or actions following the research</item>
    </list>
  </item>
  </list>
  
  Produce a methodical plan focusing on clear, practical steps.
  </stepwise-instructions>
  </poml>;
}
```

--------------------------------

### POML XML for Rule Extraction Configuration

Source: https://github.com/microsoft/poml/blob/main/docs/tutorial/expense_part1.md

This XML snippet defines the POML configuration for extracting policy rules. It specifies a task, includes various data sources like a travel budget table (Excel), a policy document (Word), employee email text, and previously extracted documents. It also defines the output schema for the LLM's response.

```xml
<poml>
  <task>From the employee email, policy documents, and budget data, select rules that apply to the extracted documents. Focus on numeric caps and binary requirements.</task>

  <cp caption="Travel Budget Table">
    <table src="assets/travel_budget_table.xlsx" syntax="csv" />
  </cp>

  <cp caption="Travel Policy Document">
    <document src="assets/travel_expense_policy.docx" />
  </cp>

  <human-msg>
    <cp caption="Email from Employee">
      <text syntax="text">{{ email_text }}</text>
    </cp>

    <cp caption="Extracted Documents">
      <object data="{{ extracted_documents }}" syntax="xml" />
    </cp>
  </human-msg>

  <output-schema>{{ rules_output_schema }}</output-schema>
</poml>
```

--------------------------------

### Register JSON Schema Tool Definition in POML

Source: https://github.com/microsoft/poml/blob/main/docs/language/meta.md

Defines a tool for AI interaction using the 'tool-definition' tag with a JSON schema for its parameters. The schema specifies the expected properties, their types, and required fields, enabling the AI to understand how to call the tool.

```xml
<tool-definition name="getWeather" description="Get weather information">
  {
    "type": "object",
    "properties": {
      "location": { "type": "string" },
      "unit": {
        "type": "string",
        "enum": ["celsius", "fahrenheit"]
      }
    },
    "required": ["location"]
  }
</tool-definition>
```

--------------------------------

### POML: Expense Compliance Check Logic

Source: https://github.com/microsoft/poml/blob/main/docs/tutorial/expense_part1.md

This POML file defines the logic for checking expense compliance. It takes structured inputs like trip context, extracted documents, and relevant rules, and outputs a detailed compliance check result including category totals, rule violations, and an overall decision. The file structure includes a task description, human messages with data objects, hints for the LLM, and an output schema defining the expected compliance structure.

```xml
<poml>
  <task>Check extracted documents against relevant rules. Calculate totals, identify violations, and determine approval status.</task>

  <human-msg>
    <cp caption="Trip Context">
      <object data="{{ trip_context }}" syntax="xml" />
    </cp>

    <cp caption="Extracted Documents">
      <object data="{{ extracted_documents }}" syntax="xml" />
    </cp>

    <cp caption="Relevant Rules">
      <object data="{{ relevant_rules }}" syntax="xml" />
    </cp>
  </human-msg>

  <hint>
    Calculate totals by category. Check each rule against the evidence.
    Determine severity of violations and suggest specific fixes.
  </hint>

  <output-schema>{{ compliance_output_schema }}</output-schema>
</poml>
```

--------------------------------

### POML Python SDK Runtime Parameter Conversion

Source: https://github.com/microsoft/poml/blob/main/docs/language/meta.md

Explains how runtime parameters are converted when using the POML Python SDK. Attributes in kebab-case are converted to snake_case, and values undergo automatic type conversion (boolean strings, number strings, JSON strings).

```python
# Example conversion for POML Python SDK:
# maxOutputTokens becomes max_output_tokens
# topP becomes top_p
# "true" becomes True
# "1000" becomes 1000
# '["END", "STOP"]' becomes ['END', 'STOP']
```

--------------------------------

### Build NPM Package

Source: https://github.com/microsoft/poml/blob/main/docs/contributing.md

Builds both CommonJS and ESM versions of the POML NPM package and creates a distributable .tgz file. This is done from the `packages/poml-build` directory.

```bash
cd packages/poml-build
npm run build
npm pack
```

--------------------------------

### Python: POML Structured Approach - Simplified Interaction Tracking

Source: https://github.com/microsoft/poml/blob/main/docs/python/integration/mcp.md

This Python snippet highlights the simplified interaction tracking offered by POML when integrating with MCP. It shows how context['interactions'] can be updated with tool request/response pairs, abstracting away the complexities of manual message role management and content formatting required in the direct MCP approach.

```python
# Simply track tool request/response pairs
context["interactions"].append([
    {"id": tc.id, "name": fn.name, "input": args, "output": result.model_dump()}
])
```

--------------------------------

### POML Runtime Parameters for OpenAI

Source: https://github.com/microsoft/poml/blob/main/docs/python/integration/openai.md

Shows how to define runtime parameters within a POML file using the `<runtime>` tag, which are automatically converted to snake_case for OpenAI compatibility.

```xml
<poml>
  <system-msg>You are a helpful assistant.</system-msg>
  <human-msg>Hello!</human-msg>

  <runtime
    model="gpt-4.1"
    temperature="0.7"
    max-tokens="150"
    top-p="1.0"
    frequency-penalty="0.5"
    presencePenalty="0.0"
  />
  <!-- can be camelCase -->
</poml>
```

--------------------------------

### PDF Conversion with JavaScript Option

Source: https://github.com/microsoft/poml/blob/main/examples/expects/107_read_report_pdf.txt

This command demonstrates how to convert an HTML document to PDF using the Prince formatter, ensuring that embedded JavaScript is processed. This is crucial for functionalities like reference management within the document.

```shell
$ prince --javascript example.html
```

--------------------------------

### POML Parameters for OpenAI Chat Completion

Source: https://github.com/microsoft/poml/blob/main/docs/python/integration/openai.md

Illustrates the structure of parameters generated by POML when using `format="openai_chat"`. This dictionary is directly usable with the OpenAI SDK.

```python
params = poml.poml("prompt.poml", format="openai_chat")
# params contains:
# {
#   "messages": [...],  # List of chat messages
#   "model": "gpt-4",   # If specified in POML
#   "temperature": 0.7, # If specified in POML
#   ...
# }
```

--------------------------------

### Display Warning for Latest Documentation (JavaScript)

Source: https://github.com/microsoft/poml/blob/main/docs/overrides/main.html

This JavaScript code snippet listens for the DOM to be fully loaded. It then checks the current URL to see if it includes 'poml/latest/'. If it does, it displays a warning banner (element with ID 'version-warning') to alert users that they are viewing development documentation.

```javascript
document.addEventListener("DOMContentLoaded", function() {
  const currentURL = window.location.href;
  const warningDiv = document.getElementById("version-warning");
  if (currentURL.includes('poml/latest/')) {
    warningDiv.style.display = "block";
  }
});
```

--------------------------------

### XML Hint Element Usage

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

This snippet demonstrates the basic usage of the 'hint' element within an XML structure. The 'hint' element is intended to enclose explanatory text or guidance for an LLM.

```xml
<hint>Alice first purchased 4 apples and then 3 more, so she has 7 apples in total.</hint>
```

--------------------------------

### POML VS Code Configuration with Multiple API Keys and URLs

Source: https://github.com/microsoft/poml/blob/main/docs/vscode/configuration.md

This JSON configuration allows for managing multiple API keys and URLs for different language model providers within POML in VS Code. This is useful for overriding default provider settings and utilizing various AI services.

```json
{
  "poml.languageModel.provider": "openai",
  "poml.languageModel.model": "gpt-4o",
  "poml.languageModel.apiKey": {
    "openai": "sk-your-openai-key",
    "anthropic": "sk-ant-your-anthropic-key",
    "google": "your-google-key"
  },
  "poml.languageModel.apiUrl": {
    "openai": "https://api.openai.com/v1/",
    "microsoft": "https://your-resource.openai.azure.com/openai"
  }
}
```

--------------------------------

### Set Weights & Biases API Key

Source: https://github.com/microsoft/poml/blob/main/docs/python/integration/weave.md

Configures the Weights & Biases API key as an environment variable. This key is required for authenticating with the Weights & Biases platform to send trace data and publish Weave objects.

```bash
export WANDB_API_KEY="your-api-key-here"
```

--------------------------------

### Display Table from Records (XML)

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

Renders a table using provided records and optional column definitions. Supports various output syntaxes. 'records' parameter is an object containing the data, and 'columns' can define the table headers and fields.

```xml
<table records="{{[{ name: 'Alice', age: 20 }, { name: 'Bob', age: 30 }]}}" />
```

--------------------------------

### POML Let Expression: Importing Data from JSON File

Source: https://github.com/microsoft/poml/blob/main/docs/language/template.md

Shows how to import data from an external JSON file into a POML variable named `users` using the `src` attribute of the `<let>` tag. The file path is relative to the POML file.

```xml
<poml>
  <let name="users" src="users.json" />
  <p>First user: {{users[0].name}}</p>
</poml>
```

--------------------------------

### Discover MCP Tools for POML

Source: https://github.com/microsoft/poml/blob/main/docs/python/integration/mcp.md

Python asynchronous function to discover available tools from an MCP server and convert them into a format compatible with the POML template. It retrieves tool definitions and transforms them into a list of dictionaries containing name, description, and schema.

```python
async def discover_mcp_tools(mcp_session):
    """Discover available tools from MCP server and convert to POML format"""
    mcp_tools = (await mcp_session.list_tools()).tools
    print(f"Available MCP tools: {mcp_tools}")

    # Convert MCP tools to POML context format.
    # The format must be compatible with the POML template above.
    poml_tools = []
    for tool in mcp_tools:
        poml_tools.append({
            "name": tool.name,
            "description": tool.description,
            "schema": tool.inputSchema
        })
    return poml_tools
```

--------------------------------

### POML Let Expression: Setting Variable using `value` attribute

Source: https://github.com/microsoft/poml/blob/main/docs/language/template.md

Demonstrates setting a variable using the `value` attribute within the `<let>` tag. The `value` attribute expects a JavaScript expression, requiring proper quoting for string literals.

```xml
<poml>
  <let name="greeting" value="'Hello, world!'" />
  <p>{{greeting}}</p>
</poml>
```

--------------------------------

### Python: Main MCP Conversation Loop with POML

Source: https://github.com/microsoft/poml/blob/main/docs/python/integration/mcp.md

This Python function, `run_mcp_conversation`, orchestrates the main conversation loop for interacting with MCP tools. It discovers tools, generates OpenAI parameters using POML, processes tool calls, and handles the final response. Dependencies include `openai`, `poml`, and custom `mcp` modules.

```python
async def run_mcp_conversation(mcp_session, context):
    """Run the conversation loop with MCP tools"""
    # Discover and add tools to context
    context["tools"] = await discover_mcp_tools(mcp_session)

    client = OpenAI()

    # Conversation loop
    while True:
        # Generate OpenAI parameters from POML
        params = poml.poml("dynamic_tools.poml", context=context, format="openai_chat")
        response = client.chat.completions.create(**params)
        message = response.choices[0].message

        if message.tool_calls:
            # Process and add tool responses to context
            responses = await process_tool_calls(mcp_session, message.tool_calls)
            context["interactions"].append(responses)
        else:
            # Final response - conversation complete
            print(f"Assistant: {message.content}")
            return message.content
```

--------------------------------

### Chrome API Usage in Background Service Worker

Source: https://github.com/microsoft/poml/blob/main/packages/poml-browser/CLAUDE.md

Demonstrates Chrome APIs that are exclusively available within the background service worker context. These include tab querying, window creation, context menu configuration, notification display, download initiation, script execution, and local/sync storage operations.

```typescript
// ✅ Available in background
chrome.tabs.query({ active: true });
chrome.windows.create({ url });
chrome.contextMenus.create({ title });
chrome.notifications.create({ message });
chrome.downloads.download({ url });
chrome.scripting.executeScript({ target });
chrome.storage.local.get(['key']);
chrome.storage.sync.set({ key: value });
```

--------------------------------

### POML VS Code API Key Setting (Single)

Source: https://github.com/microsoft/poml/blob/main/docs/vscode/configuration.md

This JSON snippet sets a single API key for POML in VS Code, which will be used across all providers. It's crucial to keep this key secure and avoid committing it to version control.

```json
{
  "poml.languageModel.apiKey": "your-api-key-here"
}
```

--------------------------------

### Format AI Messages with POML

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

The AiMessage component wraps content to be displayed as an AI message. It supports various syntax formats and allows for customization of speaker, styling (via className), and content handling with experimental options for whitespace, character limits, token limits, and priority.

```xml
<ai-msg>Paris</ai-msg>
```

--------------------------------

### LangChain Conversational Prompt Management

Source: https://github.com/microsoft/poml/blob/main/docs/python/integration/langchain.md

Shows an alternative approach to managing conversations in LangChain using multiple PromptTemplate instances for different roles (system, user, assistant) and assembling them into a list of messages. This requires manual management of the conversation flow.

```python
system_prompt = "You are a helpful assistant."
user_prompt = "What is {{ language }}?"
assistant_response = "{{ language }} is a programming language..."
followup = "Can you give an example of {{ language }}?"

# Manually manage conversation flow
template_user = PromptTemplate.from_template(user_prompt)
template_assistant = PromptTemplate.from_template(assistant_response)
template_followup = PromptTemplate.from_template(followup)

template_messages = [
    {"role": "system", "content": system_prompt},
    {"role": "user", "content": template_user},
    {"role": "ai", "content": template_assistant},
    {"role": "user", "content": template_followup},
]
```

--------------------------------

### Test LLM Reasoning with ARC-AGI Data using POML

Source: https://github.com/microsoft/poml/blob/main/examples/expects/301_generate_poml.txt

Tests an LLM's ability to perform complex reasoning by solving the ARC-AGI task. It uses a JSON file containing training and testing data to find a common rule mapping input grids to output grids.

```jsx
function arc_agi() {
  return <poml>
  <SystemMessage>Be brief and clear in your responses</SystemMessage>
  <let src="assets/202_arc_agi_data.json"/>
  <HumanMessage>
  <p>Find the common rule that maps an input grid to an output grid, given the examples below.</p>
  <examples>
    <example for="example in train" chat="false" caption="Example {{ loop.index }}" captionStyle="header">
      <input><table records="{{ example.input }}"/></input>
      <output><table records="{{ example.output }}"/></output>
    </example>
  </examples>
  
  <p>Below is a test input grid. Predict the corresponding output grid by applying the rule you found. Your final answer should just be the text output grid itself.</p>
  <input><table records="{{ test[0].input }}"/></input>
  </HumanMessage>
  
  <stylesheet>
  {
    "table": {
      "syntax": "csv",
      "writerOptions": {
          "csvHeader": false,
          "csvSeparator": " "
      }
    },
    "input": {
      "captionEnding": "colon-newline",
      "captionStyle": "plain"
    },
    "output": {
      "captionEnding": "colon-newline",
      "captionStyle": "plain"
    }
  }
  </stylesheet>
  </poml>;
}
```

--------------------------------

### POML Component Control with Meta Element

Source: https://github.com/microsoft/poml/blob/main/docs/language/meta.md

Shows how to dynamically enable or disable POML components using the `components` attribute in the `<meta>` element. Components can be disabled by prefixing with '-' and re-enabled with '+'.

```xml
<meta components="-table" />
```

```xml
<meta components="-table,-image" />
```

```xml
<meta components="+table" />
```

--------------------------------

### POML 'include' Tag for File Inclusion

Source: https://github.com/microsoft/poml/blob/main/docs/language/template.md

Explains how to use the 'include' tag in POML to incorporate content from other files. This promotes modularity in prompt creation. 'for' and 'if' attributes can also be used with 'include'.

```xml
<poml>
  <include src="snippet.poml" />
</poml>
```

```xml
<poml>
  <include src="row.poml" for="i in [1,2,3]" />
  <include src="footer.poml" if="showFooter" />
</poml>
```

--------------------------------

### Cross-Context Communication with RPC

Source: https://github.com/microsoft/poml/blob/main/packages/poml-browser/CLAUDE.md

Shows how to implement cross-context communication using the `everywhere` function from `@common/rpc`. This enables defining functions in one context and calling them from any other context, requiring registration in `common/types.ts`.

```typescript
import { everywhere } from '@common/rpc';
import { pingPong } from '@common/rpc';

// Define a function available in specific role
const myFunction = everywhere(
  'functionName',
  (arg1: string, arg2: number) => {
    // Implementation
    return result;
  },
  'background', // Role where this executes
);

// Register it in GlobalFunctions in common/types.ts
export interface GlobalFunctions extends FunctionRegistry {
  // Please put the signatures of global functions here
  functionName: (arg1: string, arg2: number) => ReturnType;
}

// Call function from any context
const result = await everywhere('functionName')(arg1, arg2);
```

--------------------------------

### Invoke POML Structured Template in LangChain

Source: https://github.com/microsoft/poml/blob/main/docs/python/integration/langchain.md

Shows how to load a POML file and invoke it with specific variables, demonstrating how LangChain interacts with the structured POML template.

```python
from poml.integration.langchain import LangchainPomlTemplate

prompt_template = LangchainPomlTemplate.from_file("persona_prompt.poml")
prompt_template.invoke({
    "person": "Mark Twain",
    "question": "What is the meaning of life?",
    "include_examples": True
})
```

--------------------------------

### POML: Automated Email Generation with Tool Call

Source: https://github.com/microsoft/poml/blob/main/docs/tutorial/expense_part1.md

This POML file defines the structure for generating automated email responses. It specifies a task to notify employees about expense report decisions, summarizing key violations and totals. It utilizes human messages with trip context and compliance results, and crucially, defines a `send_email` tool using Zod schema validation for structured arguments. POML automatically converts this definition into the correct format for the LLM API.

```xml
<poml>
  <task>
    <p>Use the tool to notify the employee about the expense report decision. Under 200 words.</p>
    <p>Summarize decision, list only the key violations with fixes, and include category totals and the overall total.</p>
  </task>

  <human-msg>
    <cp caption="Travel Context">
      <object data="{{ trip_context }}" syntax="xml" />
    </cp>

    <cp caption="Compliance Check Result">
      <object data="{{ compliance_result }}" syntax="xml" />
    </cp>
  </human-msg>

  <tool name="send_email" description="Send an email" parser="eval">
  z.object({
    to: z.string(),
    subject: z.string(),
    body: z.string(),
  })
  </tool>
</poml>
```

--------------------------------

### Configure Telemetry Connection String

Source: https://github.com/microsoft/poml/blob/main/docs/vscode/configuration.md

Sets the development telemetry connection string for POML. This is an empty string by default and is used for development purposes.

```json
{
  "poml.telemetry.connection": ""
}
```

--------------------------------

### POML XML Output Schema with Template Expressions

Source: https://github.com/microsoft/poml/blob/main/docs/language/meta.md

Shows how to define an output schema in POML using a template expression to embed a JSON schema. The schema is defined within a '<let>' tag and then referenced in the '<output-schema>' tag.

```xml
<let name="schemaJson">
{
  "type": "object",
  "properties": {
    "result": { "type": "string" }
  }
}
</let>
<output-schema parser="json">
{{ schemaJson }}
</output-schema>
```

--------------------------------

### POML Let Expression: Importing JSON File without Name

Source: https://github.com/microsoft/poml/blob/main/docs/language/template.md

Illustrates importing a JSON file using the `src` attribute without specifying a `name`. If the JSON content is an object, its properties are merged directly into the POML context.

```xml
<poml>
  <let src="config.json" />
  <p>API Key: {{apiKey}}</p>
</poml>
```

--------------------------------

### POML VS Code API Key Setting (Provider-Specific)

Source: https://github.com/microsoft/poml/blob/main/docs/vscode/configuration.md

This JSON configuration sets provider-specific API keys for POML in VS Code. This is useful when using multiple AI services or when prompts override the provider at runtime. It allows for distinct keys for OpenAI, Anthropic, Google, and Microsoft Azure.

```json
{
  "poml.languageModel.apiKey": {
    "openai": "sk-your-openai-key",
    "anthropic": "sk-ant-your-anthropic-key",
    "google": "your-google-key",
    "microsoft": "your-azure-key"
  }
}
```

--------------------------------

### JavaScript Expression Tool Schema with Context Variables in POML

Source: https://github.com/microsoft/poml/blob/main/docs/language/meta.md

Defines a tool schema using a JavaScript expression with 'parser="eval"'. It dynamically sets the allowed 'operation' values based on a context variable 'supportedOperations', demonstrating flexibility in tool definition.

```xml
<let name="supportedOperations" value='["add", "subtract", "multiply", "divide"]' />
<tool-definition name="calculator" description="Perform mathematical operations" parser="eval">
  z.object({
    operation: z.enum(supportedOperations),
    a: z.number(),
    b: z.number()
  })
</tool-definition>
```

--------------------------------

### Notification System Usage

Source: https://github.com/microsoft/poml/blob/main/packages/poml-browser/CLAUDE.md

Demonstrates the usage of a custom notification system as a replacement for `console.log` and `console.error`. It supports various levels of verbosity (debug, info, warning, error, success) and allows for custom titles and durations.

```typescript
import {
  notifyDebugMoreVerbose,
  notifyDebugVerbose,
  notifyDebug,
  notifyInfo,
  notifyWarning,
  notifyError,
  notifySuccess,
} from '@common/notification';

// ❌ Bad: Direct console logging
console.log('Operation completed');
console.error('Failed:', error);

// ✅ Good: Using notify API
notifySuccess('Operation completed');
notifyError('Failed to fetch data', error, {
  title: 'Fetch Error',
  duration: 0, // Don't auto-hide errors
});

// Debug with objects
notifyDebug('Processing item', { id: itemId, status: 'pending' });
```

--------------------------------

### POML Let Expression: Setting Variable from Literal

Source: https://github.com/microsoft/poml/blob/main/docs/language/template.md

Illustrates defining a variable named `greeting` with a literal string value using the `<let>` tag and then interpolating it within a paragraph. The content of the `<let>` tag is treated as a literal string.

```xml
<poml>
  <let name="greeting">Hello, world!</let>
  <p>{{greeting}}</p>
</poml>
```

--------------------------------

### Generate Tool Request using XML

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

This snippet illustrates the creation of a tool request using the `<ToolRequest>` XML tag. It requires an `id` and `name`, and accepts `parameters` which can be any data type. The `speaker` attribute can also be specified.

```xml
<ToolRequest id="123" name="search" parameters={{ query: "hello" }} />
```

--------------------------------

### Configure Debugging Trace Level

Source: https://github.com/microsoft/poml/blob/main/docs/vscode/configuration.md

Enables detailed tracing for troubleshooting POML issues. Options include 'off' and 'verbose'. The default value is 'off'.

```json
{
  "poml.trace": "verbose"
}
```

--------------------------------

### POML Let Expression: Setting Variable with Type Hint

Source: https://github.com/microsoft/poml/blob/main/docs/language/template.md

Shows how to specify a data type (e.g., 'integer') for a variable defined using the `<let>` tag. This can help in ensuring correct data interpretation.

```xml
<poml>
  <let name="count" type="integer">5</let>
  <p>Count: {{count}}</p>
</poml>
```

--------------------------------

### Set AgentOps API Key

Source: https://github.com/microsoft/poml/blob/main/docs/python/integration/agentops.md

Configures the AgentOps API key as an environment variable. This key is essential for authenticating and sending trace data to the AgentOps platform.

```bash
export AGENTOPS_API_KEY="your-api-key-here"
```

--------------------------------

### Summarize Report using POML

Source: https://github.com/microsoft/poml/blob/main/examples/expects/301_generate_poml.txt

Generates a concise executive summary of a given report (e.g., research paper, business report). The summary highlights key points, objectives, and outcomes, is under 150 words, and suitable for a professional audience.

```jsx
function read_report() {
  return <poml>
  <p>Provide a concise executive summary of the following text, highlighting key points, objectives, and outcomes. Keep the summary under 150 words and ensure it is suitable for a professional audience.</p>
  <Document syntax="text" src="assets/107_usenix_paper.pdf" selectedPages="1:3" />
  </poml>
  ;
```

--------------------------------

### Python Class - Inefficient User Search and Plain Text Password Storage

Source: https://github.com/microsoft/poml/blob/main/examples/expects/110_code_review.txt

The `UserManager` class's `find_user` method performs a linear search through the user list, leading to O(n) time complexity. The `add_user` method also stores passwords in plain text and lacks input validation, posing security and maintainability risks.

```python
class UserManager:
    def __init__(self):
        self.users = []

    def add_user(self, name, email, password):
        # Maintainability issue: No input validation
        user = {"name": name, "email": email, "password": password}  # Security issue: storing plain password
        self.users.append(user)

    def find_user(self, email):
        # Performance issue: Linear search
        for user in self.users:
            if user["email"] == email:
                return user
        return None
```

--------------------------------

### Render Tree Structure (XML)

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

Renders a tree structure based on provided data. Supports different output syntaxes and options to control content display. 'items' should contain the tree data, and 'syntax' determines the output format.

```xml
<Tree items={treeData} syntax="markdown" showContent={true} />
```

--------------------------------

### Render Markdown Header

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

Renders a heading or title within markdown syntax. The `syntax` parameter is set to `markdown`, and the content within the tags becomes the header text. The header level is automatically determined by the context.

```xml
<Header syntax="markdown">Section Title</Header>
```

--------------------------------

### Using Mantine Spacing System in React Components

Source: https://github.com/microsoft/poml/blob/main/packages/poml-browser/CLAUDE.md

This code showcases the recommended approach for applying spacing in React components for the POML browser extension using Mantine's predefined spacing values (xs, sm, md, lg, xl). It contrasts this with ad-hoc styling, highlighting the benefits of the Mantine spacing system for consistency.

```tsx
// ✅ Good: Mantine spacing props
<Stack p="md" gap="xs">
<Group justify="space-between" mb="md">
<Button fullWidth fz="md">

// ❌ Bad: Ad-hoc styles
<div style={{ padding: '16px', marginBottom: '12px' }}>

```

--------------------------------

### Chrome API Usage in Content Scripts

Source: https://github.com/microsoft/poml/blob/main/packages/poml-browser/CLAUDE.md

Illustrates Chrome APIs and standard DOM manipulations available within content scripts. This includes DOM element querying, accessing the window location, appending elements to the body, and limited Chrome runtime messaging and ID access.

```typescript
// ✅ Available in content script
document.querySelector('#element');
window.location.href;
document.body.appendChild(element);

// Limited Chrome APIs
chrome.runtime.sendMessage({ data });
chrome.runtime.id;
```

--------------------------------

### Define JSON Output Schema with POML

Source: https://github.com/microsoft/poml/blob/main/docs/language/meta.md

Specifies an output schema in JSON format using the 'output-schema' tag with 'parser="json"'. The schema must be a valid OpenAPI JSON Schema object. It defines the structure and types of the output.

```xml
<output-schema parser="json">
  {
    "type": "object",
    "properties": {
      "name": { "type": "string" },
      "age": { "type": "number" }
    },
    "required": ["name"]
  }
</output-schema>
```

--------------------------------

### Display Message Content using XML

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

This snippet demonstrates how to display message content using the XML tag `<msg-content>`. The `content` attribute accepts a string or an array of strings and multimedia content. This is useful for rendering various types of message data.

```xml
<msg-content content="What is the capital of France?" />
```

--------------------------------

### Process MCP Tool Calls for POML

Source: https://github.com/microsoft/poml/blob/main/docs/python/integration/mcp.md

Python asynchronous function to execute tool calls received from an LLM and format their responses for POML. It takes tool call details, invokes the corresponding tool on the MCP server, and structures the results, including input arguments and output, into a list suitable for the POML template.

```python
async def process_tool_calls(mcp_session, tool_calls):
    """Execute MCP tool calls and format responses"""
    responses = []
    for tool_call in tool_calls:
        function = tool_call.function
        args = json.loads(function.arguments or "{}")

        # Call MCP server tool
        result = await mcp_session.call_tool(function.name, args)
        print(f"Tool {function.name} result: {result}")

        # Format for POML context.
        # This format must be compatible with the POML template above.
        responses.append({
            "id": tool_call.id,
            "name": function.name,
            "input": args,
            "output": result.model_dump()
        })
    return responses
```

--------------------------------

### Display Webpage Content with POML

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

The Webpage component displays content from a given URL. It can render the entire page or extract specific content using a CSS selector. The `extractText` parameter controls whether to extract plain text or convert HTML to POML components. It also supports displaying content from local files or raw HTML strings via buffer or base64 encoding.

```xml
<webpage url="https://example.com" />
```

```xml
<webpage url="https://example.com" selector="main article" />
```

```xml
<webpage url="https://example.com" extractText="false" />
```

--------------------------------

### Display Image with Alt Text and Position

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

Renders an image from a specified source path or URL, with alternative text provided for cases where the image cannot be displayed. The position of the image can be set to 'top', 'bottom', or 'here'. This component supports various image manipulation options like resizing and setting maximum dimensions.

```xml
<Image src="path/to/image.jpg" alt="Image description" position="bottom" />
```

--------------------------------

### JSON Schema with Template Expressions in POML

Source: https://github.com/microsoft/poml/blob/main/docs/language/meta.md

Demonstrates using template expressions `{{ variable }}` within a JSON schema defined by 'output-schema'. This allows dynamic values to be injected into the schema definition, such as setting a maximum value for a property.

```xml
<let name="maxAge" value="100" />
<output-schema parser="json">
  {
    "type": "object",
    "properties": {
      "name": { "type": "string" },
      "age": {
        "type": "number",
        "minimum": 0,
        "maximum": {{ maxAge }}
      }
    }
  }
</output-schema>
```

--------------------------------

### POML Conversational AI Structure

Source: https://github.com/microsoft/poml/blob/main/docs/python/integration/langchain.md

Presents the POML XML format for structuring an entire AI conversation within a single file. It uses tags like <system-msg>, <human-msg>, and <ai-msg> to clearly delineate the different turns and roles in the conversation.

```xml
<poml>
  <system-msg>You are a helpful assistant.</system-msg>
  <human-msg>What is {{ language }}?</human-msg>
  <ai-msg>{{ language }} is a high-level, interpreted programming language...</ai-msg>
  <human-msg>Can you give an example of {{ language }}?</human-msg>
</poml>
```

--------------------------------

### Display Word Document using XML

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

Demonstrates how to display a Word document without embedding multimedia content using an XML tag. This is useful for previewing document content efficiently.

```xml
<Document src="sample.docx" multimedia="false"/>
```

--------------------------------

### POML Speaker Mode vs Non-Speaker Mode in LangChain

Source: https://github.com/microsoft/poml/blob/main/docs/python/integration/langchain.md

Shows how to instantiate LangchainPomlTemplate in either speaker mode (for structured chat messages) or non-speaker mode (for plain text output). This allows flexibility based on the desired output format.

```python
# Speaker mode: Returns ChatPromptValue with structured messages
# Use when you need conversation structure (system, user, assistant messages)
template = LangchainPomlTemplate.from_file("conversation.poml", speaker_mode=True)

# Non-speaker mode: Returns StringPromptValue with plain text
# Use when you need a single text output
template = LangchainPomlTemplate.from_file("summary.poml", speaker_mode=False)
```

--------------------------------

### Combine Limits and Priority in POML

Source: https://github.com/microsoft/poml/blob/main/docs/language/token.md

Shows how to combine character limits, token limits, and priority settings in POML for advanced content management. It details the hierarchical application of token limits from parent to child components and the order of operations for truncation and priority-based removal.

```xml
<poml tokenLimit="40">
  <h priority="5">Critical Section Header</h>

  <p priority="4" charLimit="10">
    Important introduction that should be preserved but can be shortened individually.
  </p>

  <list priority="2">
    <item priority="3">High priority item</item>
    <item priority="1">Lower priority item</item>
    <item>Lowest priority item (no explicit priority)</item>
  </list>

  <p priority="3" tokenLimit="5">Optional additional context that can be truncated aggressively.</p>
</poml>
```

--------------------------------

### Emphasize Text with Bold Component

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

Applies bold styling to text using the Bold component. Supports various syntax types and offers options for styling and content handling.

```xml
<p><b>Task:</b> Do something.</p>
```

--------------------------------

### POML Text Syntax Whitespace Preservation

Source: https://github.com/microsoft/poml/blob/main/docs/language/white-space.md

Shows the recommended approach for exact whitespace preservation in POML by using 'syntax="text"' in conjunction with 'whiteSpace="pre"'. This configuration ensures that all whitespace, including line breaks and indentation, is maintained as written.

```xml
<poml syntax="text" whiteSpace="pre">

```

--------------------------------

### Embed Audio with POML

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

Embeds an audio file using the Audio component. Accepts a file path or base64 encoded data. MIME type can be specified or inferred. Handles audio playback within content.

```xml
<Audio src="path/to/audio.mp3" />
```

--------------------------------

### POML VS Code API URL Setting (Provider-Specific)

Source: https://github.com/microsoft/poml/blob/main/docs/vscode/configuration.md

This JSON configuration specifies provider-specific API URLs for POML in VS Code. This is beneficial when different AI services require distinct endpoints, such as for OpenAI, Azure OpenAI, and Anthropic. It addresses potential 'Resource not found' errors with Azure OpenAI.

```json
{
  "poml.languageModel.apiUrl": {
    "openai": "https://api.openai.com/v1/",
    "microsoft": "https://westeurope.api.cognitive.microsoft.com/openai",
    "anthropic": "https://api.anthropic.com/"
  }
}
```

--------------------------------

### Format User Messages with POML

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

The UserMessage component (represented by the `user-msg` tag) wraps content to be displayed as a user's message. This is a straightforward way to visually distinguish user input within a chat interface.

```xml
<user-msg>What is the capital of France?</user-msg>
```

--------------------------------

### XML Usage of Role Element

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

This snippet demonstrates how to define the role for a language model using an XML tag. The content within the tag specifies the desired persona or expertise for the model.

```xml
<role>You are a data scientist.</role>
```

--------------------------------

### XML Policy Rules Definition

Source: https://github.com/microsoft/poml/blob/main/examples/expects/206_expense_send_email.txt

This XML snippet defines various policy rules for travel expenses. It includes rules for lodging caps, meal per diems, ground transportation limits, airfare class restrictions, visa and document reimbursements, client entertainment caps, mileage policies, receipt thresholds, and lodging class restrictions. Each rule specifies category, type, scope, reference, value, unit, and pre-approval requirements.

```xml
<trip_context>
  <is_international>false</is_international>
  <trip_length_days>4</trip_length_days>
</trip_context>
<rules>
  <item>
    <rule_id>1</rule_id>
    <category>lodging</category>
    <type>per_night_cap</type>
    <scope>domestic</scope>
    <reference>Policy 4. Accommodation: Use standard mid-range; cap 200 USD/night</reference>
    <value>200</value>
    <unit>USD/night</unit>
    <requires_preapproval>true</requires_preapproval>
    <non_reimbursable>false</non_reimbursable>
  </item>
  <item>
    <rule_id>2</rule_id>
    <category>meals</category>
    <type>per_day_cap</type>
    <scope>domestic</scope>
    <reference>Budget Table Appendix: Meals per diem domestic 60 USD/day</reference>
    <value>60</value>
    <unit>USD/day</unit>
    <requires_preapproval>false</requires_preapproval>
    <non_reimbursable>false</non_reimbursable>
  </item>
  <item>
    <rule_id>3</rule_id>
    <category>ground_transportation</category>
    <type>per_day_cap</type>
    <scope>domestic</scope>
    <reference>Budget Table: Ground Transportation 40/day; 250/trip</reference>
    <value>40</value>
    <unit>USD/day</unit>
    <requires_preapproval>false</requires_preapproval>
    <non_reimbursable>false</non_reimbursable>
  </item>
  <item>
    <rule_id>4</rule_id>
    <category>ground_transportation</category>
    <type>per_trip_cap</type>
    <scope>domestic</scope>
    <reference>Budget Table: Ground Transportation 40/day; 250/trip</reference>
    <value>250</value>
    <unit>USD/trip</unit>
    <requires_preapproval>false</requires_preapproval>
    <non_reimbursable>false</non_reimbursable>
  </item>
  <item>
    <rule_id>5</rule_id>
    <category>airfare</category>
    <type>booking_class_restriction</type>
    <scope>domestic</scope>
    <reference>Travel Policy: Economy class mandatory unless long flight</reference>
    <value>economy (premium economy allowed if flight &gt;8 hours)</value>
    <unit/>
    <requires_preapproval>true</requires_preapproval>
    <non_reimbursable>false</non_reimbursable>
  </item>
  <item>
    <rule_id>6</rule_id>
    <category>visa_and_documents</category>
    <type>per_trip_cap</type>
    <scope>international</scope>
    <reference>Policy: Visa &amp; Travel Documents reimbursable per-trip</reference>
    <value>150</value>
    <unit>USD/trip</unit>
    <requires_preapproval>false</requires_preapproval>
    <non_reimbursable>false</non_reimbursable>
  </item>
  <item>
    <rule_id>7</rule_id>
    <category>client_entertainment</category>
    <type>per_trip_cap</type>
    <scope>domestic</scope>
    <reference>Policy: Client entertainment requires pre-approval; cap 200/trip</reference>
    <value>200</value>
    <unit>USD/trip</unit>
    <requires_preapproval>true</requires_preapproval>
    <non_reimbursable>false</non_reimbursable>
  </item>
  <item>
    <rule_id>8</rule_id>
    <category>mileage</category>
    <type>per_trip_cap</type>
    <scope>domestic</scope>
    <reference>Policy: mileage reimbursement; must provide odometer record</reference>
    <value/>
    <unit>USD/trip</unit>
    <requires_preapproval>false</requires_preapproval>
    <non_reimbursable>false</non_reimbursable>
  </item>
  <item>
    <rule_id>9</rule_id>
    <category>receipts</category>
    <type>receipt_threshold</type>
    <scope>domestic</scope>
    <reference>Expense policy: attach itemized receipts for all expenses &gt;$25</reference>
    <value>25</value>
    <unit>USD</unit>
    <requires_preapproval>false</requires_preapproval>
    <non_reimbursable>false</non_reimbursable>
  </item>
  <item>
    <rule_id>10</rule_id>
    <category>lodging</category>
    <type>class_restriction</type>
    <scope>domestic</scope>
    <reference>Policy: luxury hotel not reimbursable</reference>
    <value>no luxury hotels (mid-range preferred)</value>
    <unit/>
    <requires_preapproval>false</requires_preapproval>
    <non_reimbursable>false</non_reimbursable>
  </item>
</rules>
```

--------------------------------

### POML Expressions: Usage in Attributes

Source: https://github.com/microsoft/poml/blob/main/docs/language/template.md

Shows how expressions enclosed in `{{ }}` can be used within XML attributes to dynamically set attribute values. This allows for context-aware element rendering.

```xml
<poml>
  <task caption="Task #{{index}}">This is task No. {{index}}.</p>
</poml>
```

--------------------------------

### Display Python Files in Directory Structure

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

Displays a directory structure, filtering to show only Python files. It traverses up to a specified depth and applies a regular expression filter to file and folder names. Directories are included unless all their nested content is filtered out, and empty directories are not shown when a filter is active.

```xml
<folder src="project_dir" filter=".*\.py$" maxDepth="3" />
```

--------------------------------

### Render Inline Code Snippet

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

Renders a code snippet directly within the text. The `inline` parameter must be set to `true` to achieve this. The `lang` parameter specifies the programming language for syntax highlighting.

```xml
<code inline="true">const x = 42;</code>
```

--------------------------------

### POML VS Code Max Tokens Setting

Source: https://github.com/microsoft/poml/blob/main/docs/vscode/configuration.md

This JSON snippet configures the maximum number of completion tokens that POML can generate in VS Code. A value of 0 indicates unlimited tokens. The default is 0.

```json
{
  "poml.languageModel.maxTokens": 2000
}
```

--------------------------------

### Invoke POML PDF Analysis in LangChain

Source: https://github.com/microsoft/poml/blob/main/docs/python/integration/langchain.md

Shows how to invoke a LangChain chain using a POML template that includes a document source. The `pdf_path` variable is passed to the template for processing.

```python
# Assuming 'chain' is defined elsewhere, and LangchainPomlTemplate is used
# result = chain.invoke({"pdf_path": "document.pdf", "question": "What are the key points?"})
```

--------------------------------

### POML 'for' Attribute for List Iteration

Source: https://github.com/microsoft/poml/blob/main/docs/language/template.md

Illustrates how to use the 'for' attribute in POML to iterate over a list. The syntax 'itemName in listName' allows access to each item within the list for rendering.

```xml
<poml>
  <list>
    <item for="item in ['apple', 'banana', 'cherry']">{{item}}</item>
  </list>
</poml>
```

--------------------------------

### Apply Priority-Based Truncation in POML

Source: https://github.com/microsoft/poml/blob/main/docs/language/token.md

Illustrates the use of the 'priority' attribute in POML to control content preservation when space is limited. Lower priority content (lower numbers) is truncated first, ensuring higher priority content is retained.

```xml
<poml tokenLimit="40">
  <p priority="1">This content has low priority and may be removed first to save space.</p>

  <p priority="3">This content has high priority and will be preserved longer.</p>

  <p priority="2">This content has medium priority.</p>

  <!-- Content without priority defaults to priority 0 (lowest) -->
  <p>This content will be truncated first since it has no explicit priority.</p>
</poml>
```

--------------------------------

### POML Let Expression: Setting Variable from Arithmetic Expression

Source: https://github.com/microsoft/poml/blob/main/docs/language/template.md

Illustrates using the `value` attribute with arithmetic expressions to define a variable `total` based on other variables `base` and `increment`. The expression is evaluated as JavaScript.

```xml
<poml>
  <let name="base" value="10" />
  <let name="increment" value="5" />
  <let name="total" value="{{ base + increment }}" />
  <p>Total: {{ total }}</p>  <!-- Output: Total: 15 -->
</poml>
```

--------------------------------

### Set Character and Token Limits in POML

Source: https://github.com/microsoft/poml/blob/main/docs/language/token.md

Demonstrates how to set soft limits on content using charLimit and tokenLimit attributes in POML. Content exceeding these limits is automatically truncated with a marker. This is useful for managing content length for AI models with input constraints.

```xml
<poml>
  <!-- Limit content to 100 characters -->
  <p charLimit="100">This is a very long paragraph that will be truncated if it exceeds the character limit. The truncation will add a marker to indicate that content was cut off.</p>

  <!-- Limit content to 50 tokens -->
  <p tokenLimit="10">This paragraph will be truncated based on token count rather than character count, which is more accurate for AI model processing.</p>
</poml>
```

--------------------------------

### Styling with Mantine Theme Object in React Components

Source: https://github.com/microsoft/poml/blob/main/packages/poml-browser/CLAUDE.md

This snippet illustrates the correct and incorrect ways to apply styles using Mantine's theme object in React components for the POML browser extension. It emphasizes using theme values for colors, borders, and border-radius for consistency and adaptiveness across light and dark modes.

```tsx
const theme = useMantineTheme();

// ✅ Good: Using theme values
<div style={{
  backgroundColor: `${theme.colors.purple[5]}15`,
  border: `3px dashed ${theme.colors.purple[6]}`,
  borderRadius: theme.radius.md,
  fontSize: theme.fontSizes.lg,
  color: theme.colors.purple[8]
}}>

// ❌ Bad: Hard-coded values
<div style={{
  backgroundColor: 'rgba(128, 0, 255, 0.15)',
  borderRadius: '8px',
  fontSize: '18px'
}}>

```

--------------------------------

### POML Expressions: Basic Variable Interpolation

Source: https://github.com/microsoft/poml/blob/main/docs/language/template.md

Demonstrates using double curly brackets `{{ }}` to embed variables or expressions within POML XML for dynamic content. Assumes variables like `name` are defined elsewhere (e.g., via `<let>`).

```xml
<poml>
  <p>Hello, {{name}}!</p>
</poml>
```

--------------------------------

### POML VS Code API Version Setting

Source: https://github.com/microsoft/poml/blob/main/docs/vscode/configuration.md

This JSON snippet sets the API version for POML in VS Code, primarily relevant for OpenAI and Azure OpenAI services. It is an optional setting.

```json
{
  "poml.languageModel.apiVersion": "2024-02-15-preview"
}
```

--------------------------------

### POML Whitespace and Syntax Interaction

Source: https://github.com/microsoft/poml/blob/main/docs/language/white-space.md

Illustrates how the 'whiteSpace' attribute interacts with different syntaxes in POML, specifically showing that syntax rules of formats like Markdown can still affect whitespace even when 'whiteSpace="pre"' is used. For guaranteed preservation, 'syntax="text"' with 'whiteSpace="pre"' is recommended.

```xml
<poml syntax="markdown" whiteSpace="pre">Marker 0
Marker 1<p>   The first paragraph.   </p>
Marker 2<p>   The second paragraph.   </p>
Marker 3</poml>
```

--------------------------------

### Python Flask App - Debug Mode in Production

Source: https://github.com/microsoft/poml/blob/main/examples/expects/110_code_review.txt

Running the Flask application with `debug=True` in a production environment is a critical security risk. Debug mode exposes sensitive information, allows arbitrary code execution, and should only be used during development. This snippet shows the insecure `app.run` configuration.

```python
if __name__ == "__main__":
    # Security issue: Debug mode in production
    app.run(debug=True, host="0.0.0.0")
```

--------------------------------

### Create Captioned Paragraphs

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

Generates a paragraph with a distinct caption title using the CaptionedParagraph component. Useful for organizing content with specific headings.

```xml
<cp caption="Constraints">
  <list>
    <item>Do not exceed 1000 tokens.</item>
    <item>Please use simple words.</item>
  </list>
</cp>
```

--------------------------------

### POML Let Expression: Setting Variable from Inline JSON

Source: https://github.com/microsoft/poml/blob/main/docs/language/template.md

Demonstrates defining a variable `person` with an inline JSON object. The properties of this object can then be accessed using dot notation within expressions.

```xml
<poml>
  <let name="person">
    {
      "name": "Alice",
      "age": 30
    }
  </let>
  <p>Name: {{person.name}}, Age: {{person.age}}</p>
</poml>
```

--------------------------------

### POML VS Code Model Name Setting

Source: https://github.com/microsoft/poml/blob/main/docs/vscode/configuration.md

This JSON snippet configures the specific model name to be used by POML in VS Code. For Azure OpenAI, this is the deployment name; for other providers, it's the model code name. For GitHub Copilot, it's used as a family name.

```json
{
  "poml.languageModel.model": "gpt-4o"
}
```

--------------------------------

### POML 'if' Attribute for Conditional Rendering

Source: https://github.com/microsoft/poml/blob/main/docs/language/template.md

Demonstrates conditional rendering in POML using the 'if' attribute. Elements can be rendered based on the boolean evaluation of a variable or a POML expression.

```xml
<poml>
  <let name="isVisible" value="true"/>
  <let name="isHidden" value="{{ !isVisible }}"/>
  <p if="isVisible">This paragraph is visible.</p>
  <p if="isHidden">This paragraph is hidden.</p>
</poml>
```

--------------------------------

### Configure Scroll Synchronization

Source: https://github.com/microsoft/poml/blob/main/docs/vscode/configuration.md

Enables synchronization of scrolling between the editor and preview panes in POML. This setting helps maintain corresponding views during content navigation. The default value is true.

```json
{
  "poml.scrollPreviewWithEditor": true,
  "poml.scrollEditorWithPreview": true
}
```

--------------------------------

### POML 'for' Attribute with Loop Variables

Source: https://github.com/microsoft/poml/blob/main/docs/language/template.md

Shows advanced usage of the 'for' attribute in POML, including access to special loop variables like 'loop.index', 'loop.length', 'loop.first', and 'loop.last' for dynamic rendering within loops.

```xml
<poml>
<let name="all_demos" value='[
    { "input": "What is your name?", "output": "My name is POML." },
    { "input": "What can you do?", "output": "I can generate prompts." }
] '/>
  <examples>
    <example for="example in all_demos" chat="false" caption="Example {{ loop.index + 1 }}" captionStyle="header">
      <input>{{ example.input }}</input>
      <output>{{ example.output }}</output>
    </example>
  </examples>
</poml>
```

--------------------------------

### POML VS Code Temperature Setting

Source: https://github.com/microsoft/poml/blob/main/docs/vscode/configuration.md

This JSON snippet sets the temperature for the language model in POML for VS Code. Temperature controls the randomness of responses, with lower values yielding more deterministic results. The default is 0.5, and the range is 0.0 to 2.0.

```json
{
  "poml.languageModel.temperature": 0.5
}
```

--------------------------------

### Python Flask Admin Panel - Missing Authentication and Performance Issue

Source: https://github.com/microsoft/poml/blob/main/examples/expects/110_code_review.txt

The admin panel route lacks any authentication or authorization checks, allowing unauthorized access to sensitive data. Additionally, it retrieves all users from the database at once, which can lead to performance issues with a large number of users. This snippet shows the problematic implementation.

```python
import sqlite3

from flask import Flask

app = Flask(__name__)


# Database connection
def get_db():
    conn = sqlite3.connect("users.db")
    return conn


@app.route("/admin")
def admin_panel():
    # Security issue: No authentication check
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall()

    # Performance issue: Loading all users at once
    return str(users)
```

--------------------------------

### Define JavaScript Expression Output Schema with POML

Source: https://github.com/microsoft/poml/blob/main/docs/language/meta.md

Defines an output schema using a JavaScript expression evaluated with 'parser="eval"'. The expression can return a Zod schema or a plain JavaScript object conforming to OpenAPI JSON Schema standards. Auto-detection of format is possible if parser is omitted.

```xml
<output-schema parser="eval">
  z.object({
    name: z.string(),
    age: z.number().optional()
  })
</output-schema>
```

--------------------------------

### Display Conversation with POML

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

The Conversation component displays a series of messages exchanged between different speakers (e.g., system, human, AI). It takes an array of message objects, where each object contains a `speaker` and `content`. Optionally, a `selectedMessages` parameter can filter which messages are displayed.

```xml
<conversation messages="{{[{ speaker: 'human', content: 'What is the capital of France?' }, { speaker: 'ai', content: 'Paris' }]}}" />
```

--------------------------------

### XML Data for Expense Report

Source: https://github.com/microsoft/poml/blob/main/examples/expects/206_expense_send_email.txt

This snippet contains the XML structure representing travel context and extracted documents for an expense report. It includes details like trip length, flight itinerary, hotel invoice, and various receipts. This data is used to perform the expense report analysis.

```xml
<is_international>false</is_international>
<trip_length_days>4</trip_length_days>
```

```xml
<item>
  <source>assets/203_flight_itinerary.pdf</source>
  <doc_type>flight_itinerary</doc_type>
  <merchant>Sample Air</merchant>
  <currency>USD</currency>
  <lines>
    <item>
      <date>2025-10-01</date>
      <description>Flight XY123 Sample Air New York (JFK) to London (LHR)</description>
      <category>airfare</category>
      <amount>0</amount>
    </item>
    <item>
      <date>2025-10-10</date>
      <description>Flight XY124 Sample Air London (LHR) to New York (JFK)</description>
      <category>airfare</category>
      <amount>0</amount>
    </item>
  </lines>
  <subtotals_by_category>
    <item>
      <category>airfare</category>
      <amount>0</amount>
    </item>
  </subtotals_by_category>
</item>
<item>
  <source>assets/203_hotel_invoice.pdf</source>
  <doc_type>hotel_invoice</doc_type>
  <merchant>Hotel Paradise</merchant>
  <currency>USD</currency>
  <lines>
    <item>
      <date/>
      <description>Deluxe Room 4 nights @ $150</description>
      <category>lodging</category>
      <amount>600</amount>
    </item>
    <item>
      <date/>
      <description>Breakfast 4 @ $20</description>
      <category>meals</category>
      <amount>80</amount>
    </item>
    <item>
      <date/>
      <description>Airport Pickup</description>
      <category>ground_transportation</category>
      <amount>50</amount>
    </item>
  </lines>
  <subtotals_by_category>
    <item>
      <category>lodging</category>
      <amount>600</amount>
    </item>
    <item>
      <category>meals</category>
      <amount>80</amount>
    </item>
    <item>
      <category>ground_transportation</category>
      <amount>50</amount>
    </item>
  </subtotals_by_category>
</item>
<item>
  <source>assets/203_meal_receipt.png</source>
  <doc_type>receipt</doc_type>
  <merchant/>
  <currency>USD</currency>
  <lines>
    <item>
      <date>2024-04-16</date>
      <description>CHEESEBURGER</description>
      <category>meals</category>
      <amount>10.99</amount>
    </item>
    <item>
      <date>2024-04-16</date>
      <description>FRIED CHICKEN</description>
      <category>meals</category>
      <amount>13.5</amount>
    </item>
    <item>
      <date>2024-04-16</date>
      <description>FRENCH FRIES</description>
      <category>meals</category>
      <amount>4.5</amount>
    </item>
    <item>
      <date>2024-04-16</date>
      <description>ICE CREAM</description>
      <category>meals</category>
      <amount>2.5</amount>
    </item>
  </lines>
  <subtotals_by_category>
    <item>
      <category>meals</category>
      <amount>31.49</amount>
    </item>
  </subtotals_by_category>
</item>
<item>
  <source>assets/203_taxi_receipt.png</source>
  <doc_type>receipt</doc_type>
  <merchant>Taxi Receipt</merchant>
  <currency>USD</currency>
  <lines>
    <item>
      <date>2024-04-05</date>
      <description>Miles</description>
      <category>miles</category>
      <amount>8.4</amount>
    </item>
    <item>
      <date>2024-04-05</date>
      <description>Fare</description>
      <category>ground_transportation</category>
      <amount>23.5</amount>
    </item>
    <item>
      <date>2024-04-05</date>
      <description>Tax</description>
      <category>tax</category>
      <amount>1</amount>
    </item>
    <item>
      <date>2024-04-05</date>
      <description>Total</description>
      <category>total</category>
      <amount>24.5</amount>
    </item>
  </lines>
  <subtotals_by_category>
    <item>
      <category>miles</category>
      <amount>8.4</amount>
    </item>
    <item>
      <category>ground_transportation</category>
      <amount>23.5</amount>
    </item>
    <item>
      <category>tax</category>
      <amount>1</amount>
    </item>
  </subtotals_by_category>
</item>
```

--------------------------------

### PomlContext Interface for Global State

Source: https://github.com/microsoft/poml/blob/main/docs/deep-dive/proposals/poml_extended.md

Defines the PomlContext interface, which serves as the central, mutable state for a POML file. It holds variables for substitutions, text content mapping, stylesheets, minimal POML version, and source path. This context is passed through all readers and is essential for stateful operations.

```typescript
interface PomlContext {
  variables: { [key: string]: any }; // For {{ substitutions }} and <let> (Read/Write)
  texts: { [key: string]: React.ReactElement }; // Maps TEXT_ID to content for <text> replacement (Read/Write)
  stylesheet: { [key: string]: string }; // Merged styles from all <meta> tags (Read-Only during render)
  minimalPomlVersion?: string; // From <meta> (Read-Only)
  sourcePath: string; // File path for resolving includes (Read-Only)
}
```

--------------------------------

### Display JSON Object Data

Source: https://github.com/microsoft/poml/blob/main/docs/language/components.md

Renders external data or object content, specifically in JSON format. The data can be provided directly as a string or object. When in serialize mode, it's processed according to the given serializer, allowing for flexible data presentation.

```xml
<DataObject syntax="json" data="{ key: 'value' }" />
```

--------------------------------

### Python Flask Login Route - SQL Injection Vulnerability

Source: https://github.com/microsoft/poml/blob/main/examples/expects/110_code_review.txt

The login route in the Flask application is vulnerable to SQL injection due to direct string formatting of user input into the SQL query. It also stores passwords in plain text, posing a significant security risk. This snippet demonstrates the vulnerable code.

```python
import sqlite3

from flask import Flask, request

app = Flask(__name__)


# Database connection
def get_db():
    conn = sqlite3.connect("users.db")
    return conn


@app.route("/login", methods=["POST"])
def login():
    username = request.form["username"]
    password = request.form["password"]

    # Security issue: SQL injection vulnerability
    query = f"SELECT * FROM users WHERE username = '{username}' AND password = '{password}'"

    conn = get_db()
    cursor = conn.cursor()
    cursor.execute(query)
    user = cursor.fetchone()

    if user:
        # Security issue: password stored in plain text
        return f"Welcome {username}!"
    else:
        return "Invalid credentials"
```

--------------------------------

### Python Function - Inefficient Nested Loops for Data Processing

Source: https://github.com/microsoft/poml/blob/main/examples/expects/110_code_review.txt

The `process_data` function contains inefficient nested loops that result in a time complexity of O(n^2). This can significantly impact performance when processing large datasets. The function aims to find duplicate elements but does so in an unoptimized manner.

```python
def process_data(data):
    result = []
    # Performance issue: Inefficient nested loops
    for i in range(len(data)):
        for j in range(len(data)):
            if data[i] == data[j] and i != j:
                result.append(data[i])
    return result
```

--------------------------------

### POML Type-Autocasting in Component Attributes

Source: https://github.com/microsoft/poml/blob/main/docs/language/template.md

Demonstrates how POML automatically casts attribute values to their defined types (boolean, number, object) when defining components. String attributes do not undergo casting. This reduces manual type conversion.

```xml
<poml>
  <let name="boolVar" type="boolean" value="true"/>
  <let name="numVar" type="number" value="42"/>
  <let name="objVar" type="object" value="{{ { key: 'value' } }}"/>

  <MyComponent boolProp="{{boolVar}}" numProp="{{numVar}}" objProp="{{objVar}}" stringProp="hello"/>
</poml>
```

--------------------------------

### Python Flask Search Route - XSS Vulnerability

Source: https://github.com/microsoft/poml/blob/main/examples/expects/110_code_review.txt

The search route in the Flask application is vulnerable to Cross-Site Scripting (XSS) because user input is directly rendered into the HTML template without proper sanitization. This allows malicious scripts to be injected and executed in the user's browser. This snippet illustrates the vulnerability.

```python
from flask import Flask, render_template_string, request

app = Flask(__name__)


@app.route("/search")
def search():
    query = request.args.get("q", "")

    # Security issue: XSS vulnerability
    template = f"<h1>Search Results for: {query}</h1>"
    return render_template_string(template)
```

--------------------------------

### Segment Interface for POML File Structure

Source: https://github.com/microsoft/poml/blob/main/docs/deep-dive/proposals/poml_extended.md

Defines the structure for a Segment, representing a portion of a POML file. It includes properties for identification, type, position, content, parent-child relationships, and tag names for POML segments. This interface is crucial for building the nested segment tree.

```typescript
interface Segment {
  id: string; // Unique ID for caching and React keys
  kind: 'META' | 'TEXT' | 'POML';
  start: number;
  end: number;
  content: string; // The raw string content of the segment
  parent?: Segment; // Reference to the parent segment
  children: Segment[]; // Nested segments (e.g., a POML block within text)
  tagName?: string; // For POML segments, the name of the root tag (e.g., 'task')
}
```
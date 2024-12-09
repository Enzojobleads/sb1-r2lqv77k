// src/services/openai.ts

export async function callOpenAIAssistant(userInput: string, apiKey: string, assistantId: string) {
  const headers = {
    'Authorization': `Bearer ${apiKey}`, // Utilisation des backticks pour l'interpolation
    'Content-Type': 'application/json',
    'OpenAI-Beta': 'assistants=v2'
  };

  try {
    // Créer un thread
    const threadResponse = await fetch('https://api.openai.com/v1/threads', {
      method: 'POST',
      headers
    });
    const threadData = await threadResponse.json();
    const threadId = threadData.id;

    // Envoyer le message utilisateur
    await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        role: 'user',
        content: userInput
      })
    });

    // Lancer le traitement
    const runResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        assistant_id: assistantId
      })
    });
    const runData = await runResponse.json();
    const runId = runData.id;

    // Attendre la fin du traitement
    let status = runData.status;
    const startTime = Date.now();
    while (status === 'queued' || status === 'in_progress') {
      if (Date.now() - startTime > 29000) {
        console.warn("Timeout atteint lors de l'attente du traitement.");
        return JSON.stringify({ classification: "{NSP}" });
      }

      await new Promise(resolve => setTimeout(resolve, 500));
      const checkResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/runs/${runId}`, {
        method: 'GET',
        headers
      });
      const checkData = await checkResponse.json();
      status = checkData.status;
    }

    // Récupérer la réponse
    if (status === 'completed') {
      const messagesResponse = await fetch(`https://api.openai.com/v1/threads/${threadId}/messages`, {
        method: 'GET',
        headers
      });
      const messagesData = await messagesResponse.json();
      for (const message of messagesData.data) {
        if (message.role === 'assistant' && message.content) {
          const finalContent = message.content[0]?.text?.value;
          return finalContent;
        }
      }
    }

    console.error(`Le traitement s'est terminé avec un statut : ${status}`);
    return JSON.stringify({ classification: "{NSP}" });
  } catch (error) {
    console.error("Erreur lors de l'appel à l'assistant :", error);
    return JSON.stringify({ classification: "{NSP}" });
  }
}

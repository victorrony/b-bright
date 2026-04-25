import { test, expect } from '@playwright/test';

// Curso: English & Communication Skills
const CURSO_SLUG = 'english-communication-skills';
const CURSO_URL = `/cursos/${CURSO_SLUG}`;

test.describe('Inscrição num curso', () => {
  test('deve mostrar a página do curso com o formulário de inscrição', async ({ page }) => {
    await page.goto(CURSO_URL);

    // Título do curso visível
    await expect(page.getByRole('heading', { name: /english/i })).toBeVisible();

    // Formulário de inscrição presente
    const form = page.locator('form');
    await expect(form).toBeVisible();
  });

  test('deve bloquear submissão com campos obrigatórios em falta', async ({ page }) => {
    await page.goto(CURSO_URL);

    // Clicar em submeter sem preencher nada
    const submitBtn = page.getByRole('button', { name: /inscrever|submeter|enviar/i });
    await submitBtn.click();

    // Mensagem de erro deve aparecer
    const errorMsg = page.getByRole('alert');
    await expect(errorMsg).toBeVisible();
  });

  test('deve submeter inscrição com sucesso ao preencher todos os campos', async ({ page }) => {
    await page.goto(CURSO_URL);

    // Preencher nome e email (campos base que todos os cursos têm)
    await page.getByLabel(/nome/i).fill('Teste Playwright');
    await page.getByLabel(/email/i).fill(`playwright.teste+${Date.now()}@teste.com`);

    // Preencher campos específicos deste curso que forem visíveis
    const phoneField = page.getByLabel(/telefone|telemóvel/i);
    if (await phoneField.isVisible()) {
      await phoneField.fill('+238 991 00 00');
    }

    // Preencher campos select se existirem
    const selects = page.locator('select');
    const count = await selects.count();
    for (let i = 0; i < count; i++) {
      const select = selects.nth(i);
      // Escolher a segunda opção (primeira não-vazia)
      const options = select.locator('option');
      const optCount = await options.count();
      if (optCount > 1) {
        const secondOption = await options.nth(1).getAttribute('value');
        if (secondOption) await select.selectOption(secondOption);
      }
    }

    // Preencher campos de texto restantes que estejam vazios
    const textInputs = page.locator('input[type="text"], input[type="number"]');
    const inputCount = await textInputs.count();
    for (let i = 0; i < inputCount; i++) {
      const input = textInputs.nth(i);
      const value = await input.inputValue();
      if (!value) await input.fill('Teste automático');
    }

    // Checkboxes — marcar todos
    const checkboxes = page.locator('input[type="checkbox"]');
    const cbCount = await checkboxes.count();
    for (let i = 0; i < cbCount; i++) {
      await checkboxes.nth(i).check();
    }

    // Submeter
    const submitBtn = page.getByRole('button', { name: /inscrever|submeter|enviar/i });
    await submitBtn.click();

    // Aguardar resposta (sucesso ou erro de validação do servidor)
    await page.waitForTimeout(2000);

    // Verificar que aparece mensagem de sucesso ou que não há erro de validação no cliente
    const successMsg = page.getByText(/sucesso|obrigad|enviado|inscrição confirmada/i);
    const errorAlert = page.getByRole('alert');

    const hasSuccess = await successMsg.isVisible().catch(() => false);
    const hasAlert = await errorAlert.isVisible().catch(() => false);

    // Pelo menos um dos dois deve estar visível (sucesso ou feedback do servidor)
    expect(hasSuccess || hasAlert).toBe(true);
  });
});

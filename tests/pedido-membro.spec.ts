import { test, expect } from '@playwright/test';

const MEMBRO_URL = '/tornar-me-membro';

// Email único por execução para evitar conflito de duplicados
const EMAIL_TESTE = `playwright.membro+${Date.now()}@teste.com`;

test.describe('Pedido de adesão como membro', () => {
  test('deve mostrar o formulário de registo de membro', async ({ page }) => {
    await page.goto(MEMBRO_URL);

    await expect(page.getByRole('heading', { name: /membro|registo/i })).toBeVisible();

    // Campos obrigatórios presentes
    await expect(page.getByLabel(/nome completo/i)).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/telemóvel/i)).toBeVisible();
    await expect(page.getByLabel(/morada/i)).toBeVisible();
    await expect(page.getByLabel(/data de nascimento/i)).toBeVisible();
  });

  test('deve bloquear submissão sem aceitar os termos', async ({ page }) => {
    await page.goto(MEMBRO_URL);

    // Preencher todos os campos menos os termos
    await page.getByLabel(/nome completo/i).fill('Teste Playwright');
    await page.getByLabel(/data de nascimento/i).fill('1990-05-14');
    await page.locator('select[name="gender"]').selectOption('masculino');
    await page.getByLabel(/email/i).fill(EMAIL_TESTE);
    await page.getByLabel(/telemóvel/i).fill('+238 991 00 00');
    await page.getByLabel(/morada/i).fill('Praia, Santiago, Cabo Verde');

    // Submeter sem marcar termos
    await page.getByRole('button', { name: /tornar-me membro/i }).click();

    // Mensagem de erro sobre os termos
    const error = page.getByRole('alert');
    await expect(error).toBeVisible();
    await expect(error).toContainText(/termos/i);
  });

  test('deve bloquear submissão com email inválido', async ({ page }) => {
    await page.goto(MEMBRO_URL);

    await page.getByLabel(/nome completo/i).fill('Teste Playwright');
    await page.getByLabel(/data de nascimento/i).fill('1990-05-14');
    await page.locator('select[name="gender"]').selectOption('masculino');
    await page.getByLabel(/email/i).fill('email-invalido');
    await page.getByLabel(/telemóvel/i).fill('+238 991 00 00');
    await page.getByLabel(/morada/i).fill('Praia, Santiago, Cabo Verde');
    await page.locator('input[name="termsAccepted"]').check();

    await page.getByRole('button', { name: /tornar-me membro/i }).click();

    const error = page.getByRole('alert');
    await expect(error).toBeVisible();
    await expect(error).toContainText(/email/i);
  });

  test('deve submeter o pedido de adesão com sucesso', async ({ page }) => {
    await page.goto(MEMBRO_URL);

    // Preencher todos os campos obrigatórios
    await page.getByLabel(/nome completo/i).fill('Victor Teste Playwright');
    await page.getByLabel(/data de nascimento/i).fill('1995-03-20');
    await page.locator('select[name="gender"]').selectOption('masculino');
    await page.getByLabel(/email/i).fill(EMAIL_TESTE);
    await page.getByLabel(/telemóvel/i).fill('+238 991 23 45');
    await page.getByLabel(/morada/i).fill('Achada Santo António, Praia, Cabo Verde');

    // Campos opcionais
    await page.getByLabel(/igreja/i).fill('Igreja Evangélica');
    await page.locator('select[name="howHeard"]').selectOption('amigo');

    // Aceitar termos
    await page.locator('input[name="termsAccepted"]').check();

    // Submeter
    await page.getByRole('button', { name: /tornar-me membro/i }).click();

    // Aguardar resposta da API
    await page.waitForTimeout(3000);

    // Verificar mensagem de sucesso
    await expect(page.getByText(/registo enviado|recebemos/i)).toBeVisible({ timeout: 10000 });
  });

  test('deve mostrar o link para consultar registo abaixo do formulário', async ({ page }) => {
    await page.goto(MEMBRO_URL);

    const link = page.getByRole('link', { name: /consulta(r)? o (teu|meu) registo/i });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '/membro');
  });
});

import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

export interface LeadPayload {
  name: string;
  phone?: string;
  intent: string;
  source?: string;
  page?: string;
  createdAt?: string;
}

export async function POST(req: Request) {
  try {
    const body: LeadPayload = await req.json();

    if (!body.name || body.name.trim().length < 2) {
      return NextResponse.json({ error: "Nome inválido." }, { status: 400 });
    }

    const leadRecord: LeadPayload = {
      name: body.name.trim(),
      phone: body.phone ? body.phone.trim() : "",
      intent: body.intent || "Contato pelo site",
      source: body.source || "web_modal",
      page: body.page || "/",
      createdAt: new Date().toISOString(),
    };

    // 1. Salva o lead em arquivo local persistente (data/leads.json)
    try {
      const dataDir = path.join(process.cwd(), "data");
      await fs.mkdir(dataDir, { recursive: true });
      const filePath = path.join(dataDir, "leads.json");

      let existingLeads: LeadPayload[] = [];
      try {
        const fileContent = await fs.readFile(filePath, "utf-8");
        existingLeads = JSON.parse(fileContent);
      } catch {
        existingLeads = [];
      }

      existingLeads.unshift(leadRecord);
      // Mantém os últimos 500 leads
      if (existingLeads.length > 500) {
        existingLeads = existingLeads.slice(0, 500);
      }

      await fs.writeFile(filePath, JSON.stringify(existingLeads, null, 2), "utf-8");
    } catch (fsErr) {
      console.error("[Lead Storage Error]", fsErr);
    }

    // 2. Dispara webhook para Discord / Telegram / WhatsApp se configurado nas variáveis de ambiente
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL || process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: `🚨 **NOVO LEAD NO AVANCINI OS!**\n👤 **Nome:** ${leadRecord.name}\n📱 **WhatsApp:** ${leadRecord.phone || "Não informado (abriu direto no WhatsApp)"}\n🎯 **Interesse:** ${leadRecord.intent}\n🌐 **Página:** ${leadRecord.page}\n🕒 **Data:** ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}`,
          }),
        });
      } catch (webhookErr) {
        console.error("[Lead Webhook Error]", webhookErr);
      }
    }

    return NextResponse.json({ success: true, lead: leadRecord });
  } catch (err) {
    console.error("[API Lead Error]", err);
    return NextResponse.json({ error: "Erro ao processar o lead." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "leads.json");
    const fileContent = await fs.readFile(filePath, "utf-8");
    const leads = JSON.parse(fileContent);
    return NextResponse.json({ total: leads.length, leads });
  } catch {
    return NextResponse.json({ total: 0, leads: [] });
  }
}

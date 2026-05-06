const { createClient } = require('@supabase/supabase-js');

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Metodo nao permitido',
      message: 'Use POST para enviar dados'
    });
  }

  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({
        error: 'Configuracao incorreta',
        message: 'Variaveis de ambiente do Supabase nao configuradas'
      });
    }

    const formData = req.body || {};
    if (!formData.qualidade_online || !formData.clareza_site || !formData.facilidade_info) {
      return res.status(400).json({
        error: 'Dados invalidos',
        message: 'Campos obrigatorios faltando'
      });
    }

    if (!formData.client_id) {
      return res.status(400).json({
        error: 'Dados invalidos',
        message: 'Identificador do dispositivo nao informado'
      });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: existingSubmission, error: existingError } = await supabase
      .from('pesquisas')
      .select('id')
      .eq('client_id', formData.client_id)
      .limit(1);

    if (existingError) {
      return res.status(500).json({
        error: 'Erro ao validar envio',
        message: existingError.message
      });
    }

    if (existingSubmission && existingSubmission.length > 0) {
      return res.status(409).json({
        error: 'Envio duplicado',
        message: 'Este dispositivo ja enviou a pesquisa'
      });
    }

    const dadosParaSalvar = {
      ...formData,
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('pesquisas')
      .insert([dadosParaSalvar])
      .select();

    if (error) {
      return res.status(500).json({
        error: 'Erro ao salvar',
        message: error.message
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Pesquisa enviada com sucesso',
      data: data[0]
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Erro interno',
      message: error.message
    });
  }
};

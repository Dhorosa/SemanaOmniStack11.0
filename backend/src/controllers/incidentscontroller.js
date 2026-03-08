const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;

    const [resultadoCount] = await connection('incidents').count({ count: '*' });
    const total = Number(resultadoCount.count || 0);

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf',
      ]);

    response.header('X-Total-Count', String(total));
    return response.json(incidents);
  },

  async create(request, response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;

    const dados = {
      title,
      description,
      value,
      ong_id,
    };

    const cliente = connection.client.config.client;
    let createdId;

    if (cliente === 'pg' || cliente === 'postgresql') {
      const [resultado] = await connection('incidents').insert(dados).returning('id');
      createdId = typeof resultado === 'object' ? resultado.id : resultado;
    } else {
      const [id] = await connection('incidents').insert(dados);
      createdId = id;
    }

    return response.json({ id: createdId });
  },

  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    if (!incident) {
      return response.status(404).json({ error: 'Incident not found.' });
    }

    if (incident.ong_id !== ong_id) {
      return response.status(401).json({ error: 'Operation not permitted.' });
    }

    await connection('incidents').where('id', id).delete();

    return response.status(204).send();
  },
};

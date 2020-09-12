const knex = require('knex');
const connection = require('../../database/connection');
const { request } = require('express');
const knexfile = require('../../../knexfile');

module.exports = {

    async getTotalSemanal (request, response) {

        /*
        Desenvolvido por: Jaqueline Silva
        Em: 16/07/2020
        Parâmetros esperados: 
                                -statusatendimentoid (status de atendimento: Novo, Concluído, Em Andamento, Cancelado)                                
        Objetivo: Retornar um objeto json o valor total de OS's de acordo com os parêmetros solicitados.
        */
        try {
            const data = new Date();
            const data1 = new Date();
            data1.setDate(data.getDate() -42);  //ultima semana (6 semanas x 7 dias cada)
    
            const {statusatendimentoid, tipoExibicao} = request.params;
    
            const ordemservicoTotal = await connection('ordemservico')
                .where({
                    "statusatendimento.id": statusatendimentoid
                })
                .whereBetween('ordemservico.dataatendimento', [data1, data])
                .join('movimentacaoos', 'movimentacaoos.ordemservicoid', '=', 'ordemservico.id')
                .join('statusatendimento', 'statusatendimento.id', '=', 'movimentacaoos.statusatendimentoid')            
                .count('ordemservico.id as total');
        
            return response.status(200).json(ordemservicoTotal);
        } catch (error) {
            return response.status(404).json(error.message);
        }
    },

    async getTotalQuinzenal (request, response) {

        /*
        Desenvolvido por: Jaqueline Silva
        Em: 16/07/2020
        Parâmetros esperados: 
                                -statusatendimentoid (status de atendimento: Novo, Concluído, Em Andamento, Cancelado)                                
        Objetivo: Retornar um objeto json o valor total de OS's de acordo com os parêmetros solicitados.
        */
        try {
            const data = new Date();
            const data1 = new Date();
            data1.setDate(data.getDate() -90);  //ultima quinzena (6 quinzenas x 15 dias cada =  90 dias)
    
            const {statusatendimentoid, tipoExibicao} = request.params;
    
            const ordemservicoTotal = await connection('ordemservico')
                .where({
                    "statusatendimento.id": statusatendimentoid
                })
                .whereBetween('ordemservico.dataatendimento', [data1, data])
                .join('movimentacaoos', 'movimentacaoos.ordemservicoid', '=', 'ordemservico.id')
                .join('statusatendimento', 'statusatendimento.id', '=', 'movimentacaoos.statusatendimentoid')            
                .count('ordemservico.id as total');
        
            return response.status(200).json(ordemservicoTotal);
        } catch (error) {
            return response.status(404).json(error.message);
        }
       
    },

    async getTotalMensal (request, response) {

        /*
        Desenvolvido por: Jaqueline Silva
        Em: 16/07/2020
        Parâmetros esperados: -statusatendimentoid (status de atendimento: Novo, Concluído, Em Andamento, Cancelado)                                
        Objetivo: Retornar um objeto json o valor total de OS's de acordo com os parêmetros solicitados.
        */
        try {
            const data = new Date();
            const data1 = new Date();
            data1.setMonth(data.getMonth() -6);  //ultimo mes
    
            const {statusatendimentoid, tipoExibicao} = request.params;
    
            const ordemservicoTotal = await connection('ordemservico')
                .where({
                    "statusatendimento.id": statusatendimentoid
                })
                .whereBetween('ordemservico.dataatendimento', [data1, data])
                .join('movimentacaoos', 'movimentacaoos.ordemservicoid', '=', 'ordemservico.id')
                .join('statusatendimento', 'statusatendimento.id', '=', 'movimentacaoos.statusatendimentoid')            
                .count('ordemservico.id as total');
        
            return response.status(200).json(ordemservicoTotal);
        } catch (error) {
            return response.status(404).json(error.message);
        }
    },

    async getValoresSemanais (request, response) {

        /*
        Desenvolvido por: Jaqueline Silva
        Em: 16/07/2020
        Parâmetro esperado: statusatendimentoid (status de atendimento: Novo, Concluído, Em Andamento, Cancelado)
        Objetivo: Retornar um objeto json com a data referência da semana e a quantidade de OS's de acordo com o status fornecido via parâmetro. 
        Irá populas os cards da dasboard com as informações das 6 últimas semanas.
        */
        try {
            const data = new Date();
        const data1 = new Date();
        data.setDate(data.getDate() -35);  //5ª semana
        data1.setDate(data1.getDate() -42);  //6ª semana

        const {statusatendimentoid} = request.params;
        const ordemservicoSemanal = await connection('ordemservico')                                
            .select(
                knex.raw(`count(ordemservico.id) as totalSemanal, DATE_ADD(CURDATE(), INTERVAL -42 DAY) AS semana`)
            )
            .where({
                    "statusatendimento.id": statusatendimentoid            
            })        
            .whereBetween('ordemservico.dataatendimento', [data1, data])
            .join('movimentacaoos', 'movimentacaoos.ordemservicoid', '=', 'ordemservico.id')
            .join('statusatendimento', 'statusatendimento.id', '=', 'movimentacaoos.statusatendimentoid')
            .union(
                knex.raw(
                    `                         
                    SELECT 
                        COUNT(os.id) as  totalSemanal,
                        DATE_ADD(CURDATE(), INTERVAL -35 DAY) AS semana
                    FROM ordemservico as os 
                        INNER JOIN movimentacaoos AS m ON os.id = m.ordemservicoid
                        INNER JOIN statusatendimento AS st ON st.id = m.statusatendimentoid
                    WHERE 
                        st.id = ${statusatendimentoid} AND os.dataatendimento BETWEEN DATE_ADD(CURDATE(), INTERVAL -35 DAY) AND DATE_ADD(CURDATE(), INTERVAL -28 DAY)
                    
                    UNION 
                    SELECT 
                        COUNT(os.id) as totalSemanal,
                        DATE_ADD(CURDATE(), INTERVAL -28 DAY) AS semana
                    FROM ordemservico as os 
                        INNER JOIN movimentacaoos AS m ON os.id = m.ordemservicoid
                        INNER JOIN statusatendimento AS st ON st.id = m.statusatendimentoid
                    WHERE 
                        st.id = ${statusatendimentoid} AND os.dataatendimento BETWEEN DATE_ADD(CURDATE(), INTERVAL -28 DAY) AND DATE_ADD(CURDATE(), INTERVAL -21 DAY)
                    
                    UNION 
                    SELECT 
                        COUNT(os.id) as  totalSemanal,
                        DATE_ADD(CURDATE(), INTERVAL -21 DAY) AS semana
                    FROM ordemservico as os 
                        INNER JOIN movimentacaoos AS m ON os.id = m.ordemservicoid
                        INNER JOIN statusatendimento AS st ON st.id = m.statusatendimentoid
                    WHERE 
                        st.id = ${statusatendimentoid} AND os.dataatendimento BETWEEN DATE_ADD(CURDATE(), INTERVAL -21 DAY) AND DATE_ADD(CURDATE(), INTERVAL -14 DAY)
                    
                    UNION 
                    SELECT 
                        COUNT(os.id) as  totalSemanal,
                        DATE_ADD(CURDATE(), INTERVAL -14 DAY) AS semana
                    FROM ordemservico as os 
                        INNER JOIN movimentacaoos AS m ON os.id = m.ordemservicoid
                        INNER JOIN statusatendimento AS st ON st.id = m.statusatendimentoid
                    WHERE 
                        st.id = ${statusatendimentoid} AND os.dataatendimento BETWEEN DATE_ADD(CURDATE(), INTERVAL -14 DAY) AND DATE_ADD(CURDATE(), INTERVAL -7 DAY)
                    
                    UNION 
                    SELECT 
                        COUNT(os.id) as totalSemanal,
                        DATE_ADD(CURDATE(), INTERVAL -7 DAY) AS semana
                    FROM ordemservico as os 
                        INNER JOIN movimentacaoos AS m ON os.id = m.ordemservicoid
                        INNER JOIN statusatendimento AS st ON st.id = m.statusatendimentoid
                    WHERE 
                        st.id = ${statusatendimentoid} AND os.dataatendimento BETWEEN DATE_ADD(CURDATE(), INTERVAL -7 DAY) AND CURDATE()                    
                `)
            )        
            return response.status(200).json(ordemservicoTotal);
        } catch (error) {
            return response.status(404).json(error.message);
        }
        
    },

    async getValoresQuinzenais (request, response) {

        /*
        Desenvolvido por: Jaqueline Silva
        Em: 16/07/2020
        Parâmetro esperado: statusatendimentoid (status de atendimento: Novo, Concluído, Em Andamento, Cancelado)
        Objetivo: Retornar um objeto json com a data referência da quinzena e a quantidade de OS's de acordo com o status fornecido via parâmetro. 
        Irá populas os cards da dasboard com as informações das 6 últimas quinzenas.
        */
        try {
            const data = new Date();
            const data1 = new Date();
            data.setDate(data.getDate() -75);  //5ª quinzena
            data1.setDate(data1.getDate() -90);  //6ª quinzena

            const {statusatendimentoid} = request.params;
            const ordemservicoQuinzenal = await connection('ordemservico')
                .select(
                    knex.raw(`count(ordemservico.id) as totalQuinzenal, DATE_ADD(CURDATE(), INTERVAL -90 DAY) AS quinzena`)
                )
                .where({
                        "statusatendimento.id": statusatendimentoid            
                })        
                .whereBetween('ordemservico.dataatendimento', [data1, data])
                .join('movimentacaoos', 'movimentacaoos.ordemservicoid', '=', 'ordemservico.id')
                .join('statusatendimento', 'statusatendimento.id', '=', 'movimentacaoos.statusatendimentoid')
                .union(            
                knex.raw(
                    `               
                    SELECT 
                        COUNT(os.id) as  totalQuinzenal,
                        DATE_ADD(CURDATE(), INTERVAL -75 DAY) AS quinzena
                    FROM ordemservico as os 
                        INNER JOIN movimentacaoos AS m ON os.id = m.ordemservicoid
                        INNER JOIN statusatendimento AS st ON st.id = m.statusatendimentoid
                    WHERE 
                        st.id = ${statusatendimentoid} AND os.dataatendimento BETWEEN DATE_ADD(CURDATE(), INTERVAL -60 DAY) AND DATE_ADD(CURDATE(), INTERVAL -75 DAY)
                                    
                    UNION 

                    SELECT 
                        COUNT(os.id) as totalQuinzenal,
                        DATE_ADD(CURDATE(), INTERVAL -60 DAY) AS quinzena
                    FROM ordemservico as os 
                        INNER JOIN movimentacaoos AS m ON os.id = m.ordemservicoid
                        INNER JOIN statusatendimento AS st ON st.id = m.statusatendimentoid
                    WHERE 
                        st.id = ${statusatendimentoid} AND os.dataatendimento BETWEEN DATE_ADD(CURDATE(), INTERVAL -45 DAY) AND DATE_ADD(CURDATE(), INTERVAL -60 DAY)
                                    
                    UNION 

                    SELECT 
                        COUNT(os.id) as  totalQuinzenal,
                        DATE_ADD(CURDATE(), INTERVAL -45 DAY) AS quinzena
                    FROM ordemservico as os 
                        INNER JOIN movimentacaoos AS m ON os.id = m.ordemservicoid
                        INNER JOIN statusatendimento AS st ON st.id = m.statusatendimentoid
                    WHERE 
                        st.id = ${statusatendimentoid} AND os.dataatendimento BETWEEN DATE_ADD(CURDATE(), INTERVAL -30 DAY) AND DATE_ADD(CURDATE(), INTERVAL -45 DAY)
                                    
                    UNION 

                    SELECT 
                        COUNT(os.id) as  totalQuinzenal,
                        DATE_ADD(CURDATE(), INTERVAL -30 DAY) AS quinzena
                    FROM ordemservico as os 
                        INNER JOIN movimentacaoos AS m ON os.id = m.ordemservicoid
                        INNER JOIN statusatendimento AS st ON st.id = m.statusatendimentoid
                    WHERE 
                        st.id = ${statusatendimentoid} AND os.dataatendimento BETWEEN DATE_ADD(CURDATE(), INTERVAL -45 DAY) AND DATE_ADD(CURDATE(), INTERVAL -30 DAY)
                                    
                    UNION 

                    SELECT 
                        COUNT(os.id) as totalQuinzenal,
                        DATE_ADD(CURDATE(), INTERVAL -15 DAY) AS quinzena
                    FROM ordemservico as os 
                        INNER JOIN movimentacaoos AS m ON os.id = m.ordemservicoid
                        INNER JOIN statusatendimento AS st ON st.id = m.statusatendimentoid
                    WHERE 
                        st.id = ${statusatendimentoid} AND os.dataatendimento BETWEEN DATE_ADD(CURDATE(), INTERVAL -15 DAY) AND CURDATE()
                                    
                `)
            )       
            return response.status(200).json(ordemservicoQuinzenal);
        } catch (error) {
            return response.status(404).json(error.message);
        }
    },

    async getValoresMensais (request, response) {

        /*
        Desenvolvido por: Jaqueline Silva
        Em: 16/07/2020
        Parâmetro esperado: statusatendimentoid (status de atendimento: Novo, Concluído, Em Andamento, Cancelado)
        Objetivo: Retornar um objeto json com a data referência do mês e a quantidade de OS's de acordo com o status fornecido via parâmetro. 
        Irá populas os cards da dasboard com as informações das 6 últimos meses.
        */
        try {
            const data = new Date();
            const data1 = new Date();
            data.setMonth(data.getMonth() - 5);
            data1.setMonth(data1.getMonth() - 6);
    
            const {statusatendimentoid} = request.params;
            const ordemservicoMensal = await connection('ordemservico')
                .select(
                    knex.raw(`
                        count(ordemservico.id) as totalMensal, 
                        MONTH(DATE_ADD(CURDATE(), INTERVAL -6 MONTH)) AS mes,
                        YEAR(DATE_ADD(CURDATE(), INTERVAL -6 MONTH)) AS ano`)
                )
                .where({
                        "statusatendimento.id": statusatendimentoid            
                })        
                .whereBetween('ordemservico.dataatendimento', [data1, data])
                .join('movimentacaoos', 'movimentacaoos.ordemservicoid', '=', 'ordemservico.id')
                .join('statusatendimento', 'statusatendimento.id', '=', 'movimentacaoos.statusatendimentoid')
                .union(
                    knex.raw(
                        `
                        SELECT 
                            COUNT(os.id) as  totalMensal,
                            MONTH(DATE_ADD(CURDATE(), INTERVAL -5 MONTH)) AS mes,
                            YEAR(DATE_ADD(CURDATE(), INTERVAL -5 MONTH)) AS ano
                        FROM ordemservico as os 
                            INNER JOIN movimentacaoos AS m ON os.id = m.ordemservicoid
                            INNER JOIN statusatendimento AS st ON st.id = m.statusatendimentoid
                        WHERE 
                            st.id = ${statusatendimentoid} AND os.dataatendimento BETWEEN  DATE_ADD(CURDATE(), INTERVAL -5 MONTH) AND DATE_ADD(CURDATE(), INTERVAL -4 MONTH)
                                    
                        UNION 
    
                        SELECT 
                            COUNT(os.id) as totalMensal,
                            MONTH(DATE_ADD(CURDATE(), INTERVAL -4 MONTH)) AS mes,
                            YEAR(DATE_ADD(CURDATE(), INTERVAL -4 MONTH)) AS ano
                        FROM ordemservico as os 
                            INNER JOIN movimentacaoos AS m ON os.id = m.ordemservicoid
                            INNER JOIN statusatendimento AS st ON st.id = m.statusatendimentoid
                        WHERE 
                            st.id = ${statusatendimentoid} AND os.dataatendimento BETWEEN  DATE_ADD(CURDATE(), INTERVAL -4 MONTH) AND DATE_ADD(CURDATE(), INTERVAL -3 MONTH)
                                    
                        UNION 
    
                        SELECT 
                            COUNT(os.id) as  totalMensal,
                            MONTH(DATE_ADD(CURDATE(), INTERVAL -3 MONTH)) AS mes,
                            YEAR(DATE_ADD(CURDATE(), INTERVAL -3 MONTH)) AS ano
                        FROM ordemservico as os 
                            INNER JOIN movimentacaoos AS m ON os.id = m.ordemservicoid
                            INNER JOIN statusatendimento AS st ON st.id = m.statusatendimentoid
                        WHERE 
                            st.id = ${statusatendimentoid} AND os.dataatendimento BETWEEN  DATE_ADD(CURDATE(), INTERVAL -3 MONTH) AND DATE_ADD(CURDATE(), INTERVAL -2 MONTH)
                                    
                        UNION 
    
                        SELECT 
                            COUNT(os.id) as  totalMensal,
                            MONTH(DATE_ADD(CURDATE(), INTERVAL -2 MONTH)) AS mes,
                            YEAR(DATE_ADD(CURDATE(), INTERVAL -2 MONTH)) AS ano
                        FROM ordemservico as os 
                            INNER JOIN movimentacaoos AS m ON os.id = m.ordemservicoid
                            INNER JOIN statusatendimento AS st ON st.id = m.statusatendimentoid
                        WHERE 
                            st.id = ${statusatendimentoid} AND os.dataatendimento BETWEEN DATE_ADD(CURDATE(), INTERVAL -2 MONTH) AND DATE_ADD(CURDATE(), INTERVAL -1 MONTH)
                                    
                        UNION 
    
                        SELECT 
                            COUNT(os.id) as totalMensal,
                            MONTH(DATE_ADD(CURDATE(), INTERVAL -1 MONTH)) AS mes,
                            YEAR(DATE_ADD(CURDATE(), INTERVAL -1 MONTH)) AS ano
                        FROM ordemservico as os 
                            INNER JOIN movimentacaoos AS m ON os.id = m.ordemservicoid
                            INNER JOIN statusatendimento AS st ON st.id = m.statusatendimentoid
                        WHERE 
                            st.id = ${statusatendimentoid} AND os.dataatendimento BETWEEN DATE_ADD(CURDATE(), INTERVAL -1 MONTH) AND CURDATE()
                                        
                    `)
                )
            return response.status(200).json(ordemservicoMensal);
        } catch (error) {
            return response.status(404).json(error.message);
        }
    },
};
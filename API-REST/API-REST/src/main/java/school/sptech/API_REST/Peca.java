package school.sptech.API_REST;

import java.util.Date;
import java.util.UUID;

public class Peca {
    private UUID id;
    private String nome;
    private Double preco;
    private String descricao;
    private Date data;
    private String categoria;
    private Tipo tipo;

    public Peca(UUID id, String nome, Double preco, String descricao, Date data, String categoria, Tipo tipo) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.descricao = descricao;
        this.data = data;
        this.categoria = categoria;
        this.tipo = tipo;
    }

    public Peca() {
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public Double getPreco() {
        return preco;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Date getData() {
        return data;
    }

    public void setData(Date data) {
        this.data = data;
    }

    public Tipo getTipo() {
        return tipo;
    }

    public void setTipo(Tipo tipo) {
        this.tipo = tipo;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }
}

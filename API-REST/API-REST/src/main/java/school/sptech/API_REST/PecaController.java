package school.sptech.API_REST;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/pecas")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class PecaController {


    private final JdbcTemplate jdbcTemplate;

    public PecaController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @GetMapping
    public ResponseEntity<List<Peca>> pegarPecas() {
        String sql = "SELECT * FROM peca";

        List<Peca> pecas = jdbcTemplate.query(sql,
                new BeanPropertyRowMapper<>(Peca.class));
        return ResponseEntity.status(200).body(pecas);
    }

    @GetMapping("/select")
    public ResponseEntity<List<Peca>> pegarSelect(){
        String sql = "SELECT nome FROM  categorias;";

        List<Peca> pecas = jdbcTemplate.query(sql,
                new BeanPropertyRowMapper<>(Peca.class));
        return ResponseEntity.status(200).body(pecas);
    }

    @PostMapping
    public ResponseEntity<Peca> cadastrarPeca(@RequestBody Peca peca) {

        UUID novoId = UUID.randomUUID();

        String sql = "INSERT INTO peca (id, nome, preco, descricao, data, categoria, tipo) VALUES (?, ?, ?, ?, ?, ?, ?)";

        jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setObject(1, novoId);
            ps.setString(2, peca.getNome());
            ps.setDouble(3, peca.getPreco());
            ps.setString(4, peca.getDescricao());
            ps.setDate(5, new java.sql.Date(peca.getData().getTime()));
            ps.setString(6, peca.getCategoria());
            ps.setString(7, peca.getTipo().name());
            return ps;
        });

        peca.setId(novoId);

        return ResponseEntity.status(HttpStatus.CREATED).body(peca);
    }
}
package br.com.sistema.Service;

import br.com.sistema.DTO.UsersDTO;
import br.com.sistema.Mapper.UsersMapper;
import br.com.sistema.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class AuthService implements UserDetailsService {

    @Autowired
    UserRepository repository;
    @Autowired
    UsersMapper mapper;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return repository.findByLogin(username);
    }

    public List<UsersDTO> findAll(){
        return mapper.toDto(repository.findAll());
    }
}

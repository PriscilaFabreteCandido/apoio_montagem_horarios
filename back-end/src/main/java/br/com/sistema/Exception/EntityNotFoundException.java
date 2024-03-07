package br.com.sistema.Exception;

import jakarta.persistence.PersistenceException;

public class EntityNotFoundException extends PersistenceException {
    public EntityNotFoundException(String message) {
        super(message);
    }
}
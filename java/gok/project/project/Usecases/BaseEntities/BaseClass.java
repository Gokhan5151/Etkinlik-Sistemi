package gok.project.project.Usecases.BaseEntities;


import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Setter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@EqualsAndHashCode(of="id")
public abstract class BaseClass {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "idgen")
    @Column(name = "id")
    private Long id;

    @Version
    @Column(name = "VERSION")
    private Long version;
    @CreatedDate
    @Column(name = "CREATION_DATE",nullable = false)
    private LocalDateTime creation_date= LocalDateTime.now();
    @LastModifiedDate
    @Column(name = "LAST_UPDATE_DATE")
    private LocalDateTime last_update_date;
}
